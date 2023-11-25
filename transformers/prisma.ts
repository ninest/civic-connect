import { Bot, BotWithCategories, Category, Document, Form, FormField, FormWithFields } from "@/types";
import { Prisma } from "@prisma/client";

export const prismaTransformer = {
  bot: (bot: Prisma.BotGetPayload<{}>): Bot => {
    return bot;
  },
  botWithCategories: (bot: Prisma.BotGetPayload<{ include: { categories: true } }>): BotWithCategories => {
    return bot;
  },
  category: (cat: Prisma.CategoryGetPayload<{}>): Category => {
    return cat;
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
