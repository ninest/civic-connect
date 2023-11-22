import { Bot, Document, Form, FormField, FormWithFields } from "@/types";
import { Prisma } from "@prisma/client";

export const prismaTransformer = {
  bot: (bot: Prisma.BotGetPayload<{}>): Bot => {
    return bot;
  },
  document: (doc: Prisma.DocumentGetPayload<{}>): Document => {
    return doc;
  },
  form: (form: Prisma.FormGetPayload<{}>): FormWithFields => {
    const transformedFormFields = form.fields as FormField[];

    const transformedForm: Form = {
      id: form.id,
      name: form.name,
      description: form.description,
      instructions: form.instructions,
    };

    return {
      ...transformedForm,
      fields: transformedFormFields,
    };
  },
};
