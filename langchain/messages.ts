import { Message } from "@/types";
import { AIMessage, BaseMessage, FunctionMessage, HumanMessage, MessageContent, SystemMessage } from "langchain/schema";
import invariant from "tiny-invariant";

export function uiToLangchainMessages(systemPrompt: string, uiMessages: Message[]) {
  const messages = uiMessages.map((uiMessage) => {
    switch (uiMessage.type) {
      case "ai": {
        return new AIMessage({ content: uiMessage.content });
      }
      case "human": {
        return new HumanMessage({ content: uiMessage.content });
      }
      case "system": {
        return new SystemMessage({ content: uiMessage.content });
      }
      case "function": {
        return new FunctionMessage({ name: "", additional_kwargs: {}, content: uiMessage.content });
      }

      default:
        return null;
    }
  });
  return [new SystemMessage({ content: systemPrompt }), ...messages.filter((m): m is BaseMessage => m != null)];
}

export function langchainToUiMessages(langchainMessages: HumanMessage[], aiName: string): Message[] {
  const messagesOrNull = langchainMessages.map((lcMessage) => {
    const type = lcMessage._getType();
    if (["human", "ai", "system", "function"].includes(type)) {
      const content = getLangchainMessageContent(lcMessage.content);
      switch (type) {
        case "human": {
          const m: Message = {
            type: "human",
            content,
          };
          return m;
        }
        case "ai": {
          const m: Message = {
            type: "ai",
            from: aiName,
            content,
          };
          return m;
        }
        case "system": {
          const m: Message = {
            type: "system",
            content,
          };
          return m;
        }
        case "function": {
          invariant(lcMessage._getType() === "function");
          const m: Message = {
            type: "function",
            name: lcMessage.name ?? "Function name",
            kwargs: lcMessage.additional_kwargs,
            content,
          };
          return m;
        }
        default:
          return null;
      }
    } else {
      return null;
    }
  });
  const messages = messagesOrNull.filter((m): m is Message => m !== null);
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
