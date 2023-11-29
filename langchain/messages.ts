import { Message } from "@/types";
import { AIMessage, BaseMessage, HumanMessage, MessageContent, SystemMessage } from "langchain/schema";
import invariant from "tiny-invariant";

export function uiToLangchainMessages(systemPrompt: string, uiMessages: Message[]) {
  const messages = uiMessages.map((uiMessage) => {
    return uiToLangchainMessage(uiMessage);
  });
  return [new SystemMessage({ content: systemPrompt }), ...messages.filter((m): m is BaseMessage => m != null)];
}

export function uiToLangchainMessage(uiMessage: Message) {
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
      return new AIMessage({
        name: uiMessage.name,
        additional_kwargs: { function_call: { name: uiMessage.name, arguments: JSON.stringify(uiMessage.arguments) } },
        content: uiMessage.content,
      });
    }
    default:
      return null;
  }
}

export function langchainToUiMessages(langchainMessages: (HumanMessage | AIMessage)[], aiName: string): Message[] {
  const messagesOrNull = langchainMessages.map((lcMessage) => {
    return langchainToUiMessage(lcMessage, aiName);
  });
  const messages = messagesOrNull.filter((m): m is Message => m !== null);
  return messages;
}

export function langchainToUiMessage(lcMessage: HumanMessage | AIMessage, aiName: string): null | Message {
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
        invariant(lcMessage._getType() === "ai");

        if (lcMessage.additional_kwargs.function_call) {
          // If reached here, the form has been submitted
          const m: Message = {
            type: "function",
            name: lcMessage.additional_kwargs.function_call.name.split("_form")[0],
            arguments: JSON.parse(lcMessage.additional_kwargs.function_call.arguments),
            content: "The form has been submitted the above information",
          };
          return m;
        }
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
          arguments: lcMessage.additional_kwargs,
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
