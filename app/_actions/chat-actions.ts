"use server";

import { createFunctions } from "@/chatbot/functions";
import { createInitialPrompt } from "@/chatbot/prompt";
import { chatModel } from "@/langchain/chat";
import {
  addToLangchainMessageContent,
  getLangchainMessageContent,
  langchainToUiMessages,
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

  const model = chatModel.bind({
    functions: createFunctions(bot, forms),
  });


  const latestHumanMessage = previousMessages[0].content;

  const docs = await vectorStore.similaritySearch(latestHumanMessage);
  let knowledge = "";
  for (const doc of docs) knowledge += `${doc.pageContent}\n`;

  const lcMessages = uiToLangchainMessages(
    // `You are ${bot.name}, For every prompt, you will be given some context. Answer the question only using that information. If you cannot find the answer in that information, say that you do not know.`,
    createInitialPrompt(bot, forms),
    previousMessages
  );
  const lcMessagesWithContext = [...lcMessages];

  const lastMessage = lcMessages.at(-1);
  invariant(lastMessage != undefined, "Last message exists");
  const lastMessageWithContext = lcMessagesWithContext.at(-1);
  invariant(lastMessageWithContext != undefined, "Last message wo exists");

  // @ts-ignore
  lastMessageWithContext.content = addToLangchainMessageContent(
    lastMessageWithContext.content,
    `\nHere is some context that may be relevant for this question: ${knowledge}`
  );

  const nextMessage = await model.predictMessages(lcMessagesWithContext);

  return [
    // ...previousMessages,
    ...langchainToUiMessages(debug ? lcMessagesWithContext : lcMessages, bot.name),
    {
      me: false,
      from: bot.name,
      content: getLangchainMessageContent(nextMessage.content),
    },
  ];
}
