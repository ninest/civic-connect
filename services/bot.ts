import { prisma } from "@/db/prisma";
import { NotFoundException } from "@/errors";
import { documentService } from "@/services/document";
import { NewBotFormType, EditBotFormType, EditBotDocumentsFormType } from "@/services/schemas";
import { prismaTransformer } from "@/transformers/prisma";
import { slugify } from "@/utils/string";

export const botService = {
  async createBot(params: NewBotFormType) {
    const newBot = await prisma.bot.create({
      data: {
        name: params.name,
        slug: slugify(params.name),
        description: params.description,
      },
    });
    return prismaTransformer.bot(newBot);
  },
  async getBots() {
    const bots = await prisma.bot.findMany();
    return bots.map(prismaTransformer.bot);
  },
  async getBotBySlug(slug: string) {
    const bot = await prisma.bot.findUnique({ where: { slug }, include: { categories: true } });
    if (!bot) throw new NotFoundException("Bot", slug);
    return prismaTransformer.botWithCategories(bot);
  },
  async getBotById(id: string) {
    const bot = await prisma.bot.findUnique({ where: { id }, include: { categories: true } });
    if (!bot) throw new NotFoundException("Bot", id);
    return prismaTransformer.botWithCategories(bot);
  },
  async editBot(id: string, params: EditBotFormType) {
    const bot = await prisma.bot.update({
      where: { id },
      data: { name: params.name, description: params.description },
    });
  },
  async editDocuments(id: string, params: EditBotDocumentsFormType) {
    await documentService.deleteAllDocuments(id);
    await documentService.createDocuments(id, params.documents);
  },
};
