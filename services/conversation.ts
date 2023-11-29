import { prisma } from "@/db/prisma";
import { prismaTransformer } from "@/transformers/prisma";
import { Category, Message } from "@/types";

export const conversationService = {
  async create(botId: string, messages: Message[], categories: Category[]) {
    const newConversation = await prisma.conversation.create({
      data: {
        botId,
        name: "Conversation",
        messages,
        categories: {
          connect: categories.map((c) => ({
            id: c.id,
          })),
        },
      },
    });
    return prismaTransformer.conversation(newConversation);
  },
  async upsert(conversationId: string, messages: Message[], categories: Category[]) {
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        messages,
        categories: {
          connect: categories.map((c) => ({
            id: c.id,
          })),
        },
      },
    });
  },
  async getMany(botId: string) {
    const conversations = await prisma.conversation.findMany({ where: { botId }, include: { categories: true } });
    return conversations.map(prismaTransformer.conversationWithCategories);
  },
  async count(botId: string) {
    const count = await prisma.conversation.count({ where: { botId } });
    return count;
  },
};
