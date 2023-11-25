"use server";

import { botService } from "@/services/bot";
import { EditBotDocumentsFormType, EditBotFormType, NewBotFormType } from "@/services/schemas";
import { urls } from "@/urls";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const newBotAction = async (data: NewBotFormType) => {
  const bot = await botService.create(data);
  return redirect(`/${bot.slug}`);
};

export const editBotAction = async (botId: string, data: EditBotFormType) => {
  const newBot = await botService.edit(botId, data);
  revalidatePath(urls.bot.edit(newBot.slug));
};

export const editBotDocumentsAction = async (botId: string, data: EditBotDocumentsFormType) => {
  await botService.editDocuments(botId, data);
};
