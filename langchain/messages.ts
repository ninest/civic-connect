import { Message } from "@/types";
import { AIMessage, HumanMessage, MessageContent, SystemMessage } from "langchain/schema";
import invariant from "tiny-invariant";

export function uiToLangchainMessages(systemPrompt: string, uiMessages: Message[]) {
  const messages = uiMessages.map((uiMessage) => {
    if (uiMessage.me) return new HumanMessage({ content: uiMessage.content });
    else return new AIMessage({ content: uiMessage.content });
  });
  return [new SystemMessage({ content: systemPrompt }), ...messages];
}

export function langchainToUiMessages(langchainMessages: HumanMessage[], aiName: string): Message[] {
  const messages = langchainMessages
    .map((lcMessage) => {
      if (lcMessage._getType() === "human") {
        let content: string = "";
        if (typeof lcMessage.content === "string") {
          content = lcMessage.content;
        } else {
          lcMessage.content.map((c) => {
            if (c.type === "text") return c.text;
            else return `![image](${c.image_url})`;
          });
        }
        const m: Message = { me: true, content };
        return m;
      } else if (lcMessage._getType() === "ai") {
        let content: string = "";
        if (typeof lcMessage.content === "string") {
          content = lcMessage.content;
        } else {
          lcMessage.content.map((c) => {
            if (c.type === "text") return c.text;
            else return `![image](${c.image_url})`;
          });
        }
        const m: Message = { me: false, from: aiName, content };
        return m;
      } else {
        return null;
      }
    })
    .filter((e): e is Message => Boolean(e));
  return messages;
}

export function addToLangchainMessageContent(messageContent: MessageContent, content: string) {
  if (typeof messageContent === "string") {
    return (messageContent += `\n${content}`);
  } else {
    return [
      ...messageContent,
      {
        type: "text",
        text: content,
      },
    ];
  }
}

export function getLangchainMessageContent(messageContent: MessageContent) {
  if (typeof messageContent === "string") {
    return messageContent;
  } else {
    const texts = messageContent.map((mc) => {
      if (mc.type === "text") return mc.text;
      else return `![image](${mc.image_url})`;
    });
    return texts.join("\n");
  }
}
