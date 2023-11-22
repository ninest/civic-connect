"use server";

import { formService } from "@/services/form";
import { FormFormType } from "@/services/schemas";

export const createFormAction = async (botId: string, data: FormFormType) => {
  await formService.createForm(botId, data);
};

export const editFormAction = async (botId: string, data: FormFormType) => {};
