"use server";

import { formService } from "@/services/form";
import { formSubmissionService } from "@/services/form-submissions";
import { urls } from "@/urls";
import { revalidatePath } from "next/cache";

export async function deleteFormSubmissionAction(formId: string, fsId: string) {
  await formSubmissionService.delete(fsId);

  const form = await formService.getById(formId);
  revalidatePath(urls.bot.formSubmissions(form.botId, formId));
}
