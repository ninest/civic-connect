import { prisma } from "@/db/prisma";
import { InvalidDataException, NotFoundException } from "@/errors";
import { FormSubmissionType, formSubmissionSchema } from "@/services/schemas";
import { prismaTransformer } from "@/transformers/prisma";

export const formSubmissionService = {
  async submit(botId: string, formName: string, data: FormSubmissionType) {
    const form = await prisma.form.findFirst({ where: { botId, name: formName } });
    if (!form) throw new NotFoundException("Form", formName);

    const result = await formSubmissionSchema.safeParse(data);
    if (!result.success) throw new InvalidDataException("FormSubmission", formName, data);

    await prisma.formSubmission.create({
      data: {
        formId: form.id,
        fields: form.fields,
        fieldValues: data,
      },
    });
  },

  async getMany(formId: string) {
    const fs = await prisma.formSubmission.findMany({ where: { formId } });
    return fs.map(prismaTransformer.formSubmission);
  },

  async getCount(formId: string) {
    return prisma.formSubmission.count({ where: { formId } });
  },

  async delete(id: string) {
    await prisma.formSubmission.delete({ where: { id: id } });
  },
};
