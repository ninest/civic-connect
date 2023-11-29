"use client";

import { deleteFormSubmissionAction } from "@/app/_actions/form-submissions-action";
import { Button } from "@/components/ui/button";

export function DeleteFormSubmissionButton({ formId, submissionId }: { formId: string; submissionId: string }) {
  return (
    <form
      action={async () => {
        await deleteFormSubmissionAction(formId, submissionId);
      }}
    >
      <Button variant={"secondary"} size={"sm"}>
        Delete
      </Button>
    </form>
  );
}
