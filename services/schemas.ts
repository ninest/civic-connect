import { z } from "zod";

export const documentSchema = z.object({ name: z.string(), content: z.string() });
export type DocumentType = z.infer<typeof documentSchema>;

export const newBotFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});
export type NewBotFormType = z.infer<typeof newBotFormSchema>;

export const editBotFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
  documents: z.array(documentSchema),
});
export type EditBotFormType = z.infer<typeof editBotFormSchema>;
