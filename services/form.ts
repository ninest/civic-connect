import { prisma } from "@/db/prisma";
import { InvalidDataException, NotAllowedException, NotFoundException } from "@/errors";
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
    // Form name must be unique
    const existingFormByName = await prisma.form.findFirst({ where: { botId, name: params.name } });
    if (existingFormByName) throw new NotAllowedException(`For by name ${params.name} already exists`);

    const form = await prisma.form.create({
      data: {
        botId,
        ...params,
        fields: [],
      },
    });
    return prismaTransformer.form(form);
  },
  async edit(formId: string, params: FormFormType) {
    const form = await prisma.form.update({ where: { id: formId }, data: params });
    return prismaTransformer.form(form);
  },
  async editFields(formId: string, params: EditFormFieldsType) {
    const form = await prisma.form.update({
      where: { id: formId },
      data: {
        fields: params.fields,
      },
    });
    return prismaTransformer.form(form);
  },
};
