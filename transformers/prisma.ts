import {
  Bot,
  BotWithCategories,
  Category,
  CategoryWithBotId,
  Document,
  Form,
  FormSubmission,
  FormField,
  FormWithBotId,
  FormWithBotIdWithFields,
  FormWithFields,
  Conversation,
  ConversationWithCategories,
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
      prompt: form.prompt,
      botId: form.botId,
    };

    return {
      ...transformedForm,
      fields: transformedFormFields,
    };
  },
  formSubmission: (fs: Prisma.FormSubmissionGetPayload<{}>): FormSubmission => {
    return {
      id: fs.id,
      formId: fs.formId,
      fields: fs.fields,
      fieldValues: fs.fieldValues,
    };
  },
  conversation: (c: Prisma.ConversationGetPayload<{}>): Conversation => {
    return {
      id: c.id,
      messages: c.messages,
      name: c.name,
      rating: c.rating,
    };
  },
  conversationWithCategories: (
    c: Prisma.ConversationGetPayload<{ include: { categories: true } }>
  ): ConversationWithCategories => {
    return {
      id: c.id,
      messages: c.messages,
      name: c.name,
      rating: c.rating ?? undefined,
      categories: c.categories.map(prismaTransformer.category),
    };
  },
  categoriesWithConversationCount: (
    cwcc: Prisma.CategoryGetPayload<{ select: { id: true; name: true; _count: { select: { conversations: true } } } }>
  ) => {
    return { id: cwcc.id, name: cwcc.name, conversationsCount: cwcc._count.conversations };
  },
};
