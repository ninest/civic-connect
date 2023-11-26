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
import { Message } from "@/types";
import invariant from "tiny-invariant";

export async function getMessagesAction(
  botId: string,
  previousMessages: Message[],
  debug: boolean = false
): Promise<Message[]> {
  const bot = await botService.getById(botId);
  const forms = await formService.getForms(botId);

  console.log(previousMessages)

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
  console.log(nextMessage);

  const prevUiMessages = langchainToUiMessages(debug ? lcMessagesWithContext : lcMessages, bot.name);
  const latestUiMessage = langchainToUiMessage(nextMessage, bot.name);

  if (latestUiMessage) return [...prevUiMessages, latestUiMessage];
  else return [...prevUiMessages];
}
