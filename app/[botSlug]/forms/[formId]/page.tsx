import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { ForFieldsForm } from "@/app/[botSlug]/forms/form-fields-form";
import { FormForm } from "@/app/[botSlug]/forms/form-form";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { formService } from "@/services/form";
import { formSubmissionService } from "@/services/form-submissions";
import { formSubmissionSchema } from "@/services/schemas";

export default async function FormEditFieldsPage({ params }: { params: { formId: string } }) {
  const form = await formService.getById(params.formId);


  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }, { title: `${form.name}` }]}>
      <FormForm formId={form.id} defaultValues={form} />

      <Spacer className="h-5" />
      <hr />
      <Spacer className="h-5" />

      <Title level={2}>Fields</Title>
      <Spacer className="h-5" />
      <ForFieldsForm formId={form.id} defaultValues={{ fields: form.fields }} />
    </BotSubPageLayout>
  );
}
