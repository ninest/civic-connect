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
};
export type FormField = {
  fieldName: string;
  valueType: "string" | "number";
  description: string;
};
export type FormWithFields = Form & {
  fields: FormField[];
};

export type Message = ({ me: false; from: string } | { me: true }) & {
  content: string;
};
