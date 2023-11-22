import { prisma } from "@/db/prisma";
import { FormFormType } from "@/services/schemas";
import { prismaTransformer } from "@/transformers/prisma";

export const formService = {
  async getForms(botId: string) {
    const forms = await prisma.form.findMany({ where: { botId } });
    return forms.map(prismaTransformer.form);
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
};
