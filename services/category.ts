import { prisma } from "@/db/prisma";
import { NotFoundException } from "@/errors";
import { EditCategoryFormType } from "@/services/schemas";
import { prismaTransformer } from "@/transformers/prisma";

export const categoryService = {
  async get(categoryId: string) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) throw new NotFoundException("Category", categoryId);
    return prismaTransformer.category(category);
  },
  async add(botId: string, params: EditCategoryFormType) {
    await prisma.category.create({ data: { botId, ...params } });
  },
  async edit(categoryId: string, params: EditCategoryFormType) {
    await prisma.category.update({
      where: { id: categoryId },
      data: params,
    });
  },
};
