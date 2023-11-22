import { prisma } from "@/db/prisma";
import { NotFoundException } from "@/errors";
import { EditFormFieldsType, FormFormType } from "@/services/schemas";
import { prismaTransformer } from "@/transformers/prisma";

export const formService = {
  async getForms(botId: string) {
    const forms = await prisma.form.findMany({ where: { botId } });
    return forms.map(prismaTransformer.form);
  },
  async getForm(formId: string) {
    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form) throw new NotFoundException("Form", formId);
    return prismaTransformer.form(form);
  },
  async createForm(botId: string, params: FormFormType) {
    await prisma.form.create({
      data: {
        botId,
        ...params,
        fields: [],
      },
    });
  },
  async edit(formId: string, params: FormFormType) {
    await prisma.form.update({ where: { id: formId }, data: params });
  },
  async editFields(formId: string, params: EditFormFieldsType) {
    await prisma.form.update({
      where: { id: formId },
      data: {
        fields: params.fields,
      },
    });
  },
};
