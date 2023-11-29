import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { DeleteFormSubmissionButton } from "@/app/[botSlug]/(admin-dashboard)/forms/[formId]/submissions/delete-form-submission-button";
import { deleteFormSubmissionAction } from "@/app/_actions/form-submissions-action";
import { Card } from "@/components/card";
import { NoElementsEmpty } from "@/components/empty";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { formService } from "@/services/form";
import { formSubmissionService } from "@/services/form-submissions";

export default async function FormEditFieldsPage({ params }: { params: { formId: string } }) {
  const form = await formService.getById(params.formId);
  const submissions = await formSubmissionService.getMany(params.formId);

  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }, { title: `${form.name}` }, { title: `Submissions` }]}>
      {submissions.length === 0 && (
        <>
          <NoElementsEmpty children="No submissions yet ..." />
        </>
      )}
      <section className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-5">
        {submissions.map((submission) => {
          const keyValues = Object.entries(submission.fieldValues);
          return (
            <Card key={submission.id} className="p-3 space-y-1 text-sm">
              {keyValues.map((kv) => {
                const [key, value] = kv;
                return (
                  <div key={key}>
                    <b>{key}</b>
                    <div>{value}</div>
                  </div>
                );
              })}
              <Spacer className="h-2" />
              <DeleteFormSubmissionButton formId={form.id} submissionId={submission.id} />
            </Card>
          );
        })}
      </section>
    </BotSubPageLayout>
  );
}
