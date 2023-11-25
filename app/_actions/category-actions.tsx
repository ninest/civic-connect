"use server";

import { botService } from "@/services/bot";
import { categoryService } from "@/services/category";
import { EditCategoryFormType } from "@/services/schemas";
import { urls } from "@/urls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addCategoryAction = async (botId: string, data: EditCategoryFormType) => {
  await categoryService.add(botId, data);
  const bot = await botService.getById(botId);
  revalidatePath(urls.bot.edit(bot.slug));
  return redirect(urls.bot.edit(bot.slug));
};

export const editCategoryAction = async (categoryId: string, data: EditCategoryFormType) => {
  const category = await categoryService.edit(categoryId, data);
  const bot = await botService.getById(category.botId);
  revalidatePath(urls.bot.edit(bot.slug));
};

export const deleteCategoryAction = async (categoryId: string, redirectHref: string) => {
  const category = await categoryService.delete(categoryId);
  const bot = await botService.getById(category.botId);
  revalidatePath(urls.bot.edit(bot.slug));
  return redirect(redirectHref);
};
