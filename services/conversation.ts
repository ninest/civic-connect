import { prisma } from "@/db/prisma";
import { prismaTransformer } from "@/transformers/prisma";
import { Category, Message } from "@/types";

export const conversationService = {
  async create(botId: string, messages: Message[], categoryIds: string[]) {
    const newConversation = await prisma.conversation.create({
      data: {
        botId,
        name: "Conversation",
        messages,
        categories: { connect: categoryIds.map((id) => ({ id })) },
      },
    });
    return prismaTransformer.conversation(newConversation);
  },
  async upsert(conversationId: string, messages: Message[], categoryIds: string[]) {
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        messages,
        categories: { connect: categoryIds.map((id) => ({ id })) },
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
  async delete(conversationId: string) {
    const conversation = await prisma.conversation.delete({ where: { id: conversationId } });
    return conversation;
  },
};
