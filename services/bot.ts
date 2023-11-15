import { prisma } from "@/db/prisma";
import { NotFoundException } from "@/errors";
import { documentService } from "@/services/document";
import { NewBotFormType, EditBotFormType } from "@/services/schemas";
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
    console.log(slug);
    const bot = await prisma.bot.findUnique({ where: { slug } });
    if (!bot) throw new NotFoundException("Bot", slug);
    return prismaTransformer.bot(bot);
  },
  async editBot(id: string, params: EditBotFormType) {
    await documentService.deleteAllDocuments(id);
    const bot = await prisma.bot.update({
      where: { id },
      data: { name: params.name, description: params.description },
    });

    await documentService.createDocuments(id, params.documents);
  },
};
