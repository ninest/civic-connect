"use server";

import { categoryService } from "@/services/category";
import { EditCategoryFormType } from "@/services/schemas";

export const addCategoryAction = async (botId: string, data: EditCategoryFormType) => {
  await categoryService.add(botId, data);
};

export const editCategoryAction = async (categoryId: string, data: EditCategoryFormType) => {
  await categoryService.edit(categoryId, data);
};
