"use server";

import { NewBotFormType } from "@/app/new-bot/new-bot-schemas";

export const newBotAction = async (data: NewBotFormType) => {
  console.log(data);
};
