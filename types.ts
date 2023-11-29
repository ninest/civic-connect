import { FormFieldType, FormSubmissionType } from "@/services/schemas";

export type Bot = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};
export type CategoryWithBotId = Category & { botId: string };

export type BotWithCategories = Bot & {
  categories: Category[];
};

export type Document = {
  id: string;
  name: string;
  content: string;
};

export type Form = {
  id: string;
  name: string;
  description: string;
  instructions: string;
  prompt: string;
};
export type FormWithBotId = Form & { botId: string };

export type FormField = {
  fieldName: string;
  valueType: "string" | "number";
  description: string;
};

export type FormWithFields = Form & { fields: FormField[] };
export type FormWithBotIdWithFields = FormWithBotId & { fields: FormField[] };

type HumanMessage = { type: "human" };
type AiMessage = { type: "ai"; from: string };
type SystemMessage = { type: "system" };
type FunctionMessage = { type: "function"; name: string; arguments: any };
export type Message = (HumanMessage | AiMessage | SystemMessage | FunctionMessage) & {
  content: string;
};

export type FormSubmission = {
  id: string;
  formId: string;

  fields: FormFieldType[];
  fieldValues: FormSubmissionType;
};

export type Conversation = {
  id: string;
  name: string;
  messages: Message[];
  rating?: number;
};

export type ConversationWithCategories = Conversation & {
  categories: Category[];
};
