"use server";

import { createFunctions } from "@/chatbot/functions";
import { createInitialPrompt } from "@/chatbot/prompt";
import { chatModel } from "@/langchain/chat";
import {
  addToLangchainMessageContent,
  getLangchainMessageContent,
  langchainToUiMessage,
  langchainToUiMessages,
  uiToLangchainMessage,
  uiToLangchainMessages,
} from "@/langchain/messages";
import { vectorStore } from "@/langchain/vectorspaces";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { formSubmissionService } from "@/services/form-submissions";
import { Message } from "@/types";
import { urls } from "@/urls";
import { revalidatePath } from "next/cache";
import invariant from "tiny-invariant";

export async function getMessagesAction(
  botId: string,
  previousMessages: Message[],
  debug: boolean = false
): Promise<Message[]> {
  const bot = await botService.getById(botId);
  const forms = await formService.getMany(botId);

  const model = chatModel.bind({ functions: createFunctions(bot, forms) });

  const latestHumanMessage = previousMessages[0].content;

  // const docs = await vectorStore.similaritySearch(latestHumanMessage);
  // let knowledge = "";
  // for (const doc of docs) knowledge += `${doc.pageContent}\n`;

  const lcMessages = uiToLangchainMessages(
    createInitialPrompt(bot, forms),
    // Filter to ensure the system prompt is not duplicated
    previousMessages.filter((m) => m.type !== "system")
  );
  const lcMessagesWithContext = [...lcMessages];

  const lastMessage = lcMessages.at(-1);
  invariant(lastMessage != undefined, "Last message exists");
  const lastMessageWithContext = lcMessagesWithContext.at(-1);
  invariant(lastMessageWithContext != undefined, "Last message wo exists");

  // @ts-ignore
  // lastMessageWithContext.content = addToLangchainMessageContent(
  //   lastMessageWithContext.content,
  //   `\nHere is some context that may be relevant for this question: ${knowledge}`
  // );

  const nextMessage = await model.invoke(lcMessagesWithContext);

  if (nextMessage.additional_kwargs.function_call) {
    // Submit a form!
    const formName = nextMessage.additional_kwargs.function_call.name.split("_form")[0];
    const values = JSON.parse(nextMessage.additional_kwargs.function_call.arguments);

    await formSubmissionService.submit(bot.id, formName, values);
    const form = await formService.getByName(formName);
    revalidatePath(urls.bot.formSubmissions(bot.slug, form.id));
  }

  const prevUiMessages = langchainToUiMessages(debug ? lcMessagesWithContext : lcMessages, bot.name);
  const latestUiMessage = langchainToUiMessage(nextMessage, bot.name);

  if (latestUiMessage) return [...prevUiMessages, latestUiMessage];
  else return [...prevUiMessages];
}
