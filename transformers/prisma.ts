import {
  Bot,
  BotWithCategories,
  Category,
  CategoryWithBotId,
  Document,
  Form,
  FormField,
  FormWithBotId,
  FormWithBotIdWithFields,
  FormWithFields,
} from "@/types";
import { Prisma } from "@prisma/client";

export const prismaTransformer = {
  bot: (bot: Prisma.BotGetPayload<{}>): Bot => {
    return bot;
  },
  botWithCategories: (bot: Prisma.BotGetPayload<{ include: { categories: true } }>): BotWithCategories => {
    return bot;
  },
  category: (cat: Prisma.CategoryGetPayload<{}>): CategoryWithBotId => {
    return cat;
  },
  document: (doc: Prisma.DocumentGetPayload<{}>): Document => {
    return doc;
  },
  form: (form: Prisma.FormGetPayload<{}>): FormWithBotIdWithFields => {
    const transformedFormFields = form.fields as FormField[];

    const transformedForm: FormWithBotId = {
      id: form.id,
      name: form.name,
      description: form.description,
      instructions: form.instructions,
      botId: form.botId,
    };

    return {
      ...transformedForm,
      fields: transformedFormFields,
    };
  },
};
