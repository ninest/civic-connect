import { z } from "zod";

export const documentSchema = z.object({ name: z.string(), content: z.string() });
export type DocumentType = z.infer<typeof documentSchema>;

export const newBotFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});
export type NewBotFormType = z.infer<typeof newBotFormSchema>;

export const editCategoryFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
});
export type EditCategoryFormType = z.infer<typeof editCategoryFormSchema>;

export const editBotFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
  conversationStarters: z.array(z.object({ text: z.string().min(3) })),
});
export type EditBotFormType = z.infer<typeof editBotFormSchema>;

export const editBotDocumentsFormSchema = z.object({
  documents: z.array(documentSchema),
});
export type EditBotDocumentsFormType = z.infer<typeof editBotDocumentsFormSchema>;

export const formFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
  instructions: z.string().min(5),
});
export type FormFormType = z.infer<typeof formFormSchema>;

export const formFieldSchema = z.object({
  fieldName: z.string().min(2),
  valueType: z.union([z.literal("string"), z.literal("number")]),
  description: z.string().min(5),
});
export type FormFieldType = z.infer<typeof formFieldSchema>;

export const editFormFieldsSchema = z.object({
  fields: z.array(formFieldSchema),
});
export type EditFormFieldsType = z.infer<typeof editFormFieldsSchema>;

export const formSubmissionSchema = z.record(z.string());
export type FormSubmissionType = z.infer<typeof formSubmissionSchema>;
