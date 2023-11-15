import { prisma } from "@/db/prisma";
import { NotFoundException } from "@/errors";
import { prismaTransformer } from "@/transformers/prisma";
import { slugify } from "@/utils/string";
import { z } from "zod";

export const newBotFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
});
export type NewBotFormType = z.infer<typeof newBotFormSchema>;

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
    const bot = await prisma.bot.findUnique({ where: { slug } });
    if (!bot) throw new NotFoundException("Bot", slug);
    return prismaTransformer.bot(bot);
  },
};
