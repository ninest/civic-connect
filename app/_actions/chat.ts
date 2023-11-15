"use server";

import { ChatProps } from "@/components/chat";
import { chatModel } from "@/langchain/chat";
import { vectorStore } from "@/langchain/vectorspaces";
import { AIMessage, HumanMessage } from "langchain/schema";

export const sendMessagesAndGet = async (
  prevMessages: ChatProps["messages"],
  latestHumanMessage: string
): Promise<ChatProps["messages"]> => {
  console.log(prevMessages);

  const messages = prevMessages.map((m) => {
    if (m.me) {
      return new HumanMessage({ content: m.content?.toString() });
    } else {
      return new AIMessage({ content: m.content?.toString() });
    }
  });

  const docs = await vectorStore.similaritySearch(latestHumanMessage);
  let knowledge = "";
  for (const d of docs) {
    knowledge += `${d.pageContent}\n`;
  }

  messages.push(
    new HumanMessage({
      content: `${latestHumanMessage}\n\nCan you answer this question only using the information below? If you do not find the answer here, say that you do not know. If the user is sharing an opinion, you should accept it and say thank you and nothing else. Make sure that you understand if they are sharing an opinion or requesting an opinion. If they share an opinion on Seth, say "Thanks for the opinion on Seth". If they want an opinion, say "Seth will be with you soon".\n\n${knowledge}`,
    })
  );

  const nextMessage = await chatModel.predictMessages(messages);

  // return [...prevMessages, { me: false, name: "AI", content: nextMessage.content }];
  // return [...prevMessages, { me: false, from: "AI", content: nextMessage.content.toString() }];
  const toReturn = [
    ...messages.map((m) => {
      if (m._getType() == "human") {
        return {
          from: "Me",
          me: true,
          content: m.content.toString(),
        };
      } else {
        return {
          from: "AI",
          me: false,
          content: m.content.toString(),
        };
      }
    }),
    {
      from: "AI",
      me: false,
      content: nextMessage.content.toString(),
    },
  ];
  return toReturn;
};
