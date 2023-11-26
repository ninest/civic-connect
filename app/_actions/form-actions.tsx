"use server";

import { InvalidDataException } from "@/errors";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { EditFormFieldsType, FormFormType, editFormFieldsSchema } from "@/services/schemas";
import { urls } from "@/urls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createFormAction = async (botId: string, data: FormFormType) => {
  const form = await formService.create(botId, data);
  const bot = await botService.getById(form.botId);
  return redirect(urls.bot.editForm(bot.slug, form.id));
};

export const editFormAction = async (formId: string, data: FormFormType) => {
  const form = await formService.edit(formId, data);
  const bot = await botService.getById(form.botId);
  revalidatePath(urls.bot.forms(bot.slug));
  return redirect(urls.bot.forms(bot.slug));
};

export const editFormFieldsAction = async (formId: string, data: EditFormFieldsType) => {
  const result = editFormFieldsSchema.safeParse(data);
  if (!result.success) throw new InvalidDataException("Form", formId, data);
  const form = await formService.editFields(formId, data);

  const bot = await botService.getById(form.botId);

  revalidatePath(urls.bot.forms(bot.slug));
  return redirect(urls.bot.forms(bot.slug));
};
