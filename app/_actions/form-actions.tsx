"use server";

import { InvalidDataException } from "@/errors";
import { formService } from "@/services/form";
import { EditFormFieldsType, FormFormType, editFormFieldsSchema } from "@/services/schemas";

export const createFormAction = async (botId: string, data: FormFormType) => {
  await formService.createForm(botId, data);
};

export const editFormAction = async (formId: string, data: FormFormType) => {
  await formService.edit(formId, data);
};

export const editFormFieldsAction = async (formId: string, data: EditFormFieldsType) => {
  const result = editFormFieldsSchema.safeParse(data);
  if (!result.success) throw new InvalidDataException("Form", formId, data);
  await formService.editFields(formId, data);
};
