export type Bot = {
  id: string;
  slug: string;
  name: string;
  description: string;
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
};
export type FormWithFields = Form & {
  fields: FormField[];
};
