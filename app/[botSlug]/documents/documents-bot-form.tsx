"use client";

import { editBotDocumentsAction } from "@/app/_actions/bot-actions";
import { NoElementsEmpty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { EditBotDocumentsFormType, EditBotFormType, editBotDocumentsFormSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  botId: string;
  defaultValues: Partial<EditBotDocumentsFormType>;
}

export function BotDocumentsForm({ botId, defaultValues }: Props) {
  const form = useForm<EditBotDocumentsFormType>({
    resolver: zodResolver(editBotDocumentsFormSchema),
    defaultValues: {
      documents: defaultValues.documents,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: "documents",
    control: form.control,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await editBotDocumentsAction(botId, data);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.length === 0 && (
            <>
              <NoElementsEmpty children="No documents yet ..." />
            </>
          )}
          <div className="grid gap-4 grid-cols-2">
            {fields.map((field, index) => (
              <section key={field.id} className="rounded-md p-2 pl-4 border flex items-center justify-between">
                {!!field.content ? (
                  <>
                    <div className="font-mono text-sm">{field.name}</div>
                  </>
                ) : (
                  <>
                    <div>
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`documents.${index}.content`}
                        render={({ field }) => (
                          <FormItem className="text-xs">
                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e?.target?.files[0];
                                if (file && file.type === "text/plain") {
                                  const reader = new FileReader();
                                  reader.readAsText(file);
                                  reader.onload = (e) => {
                                    field.onChange(e.target?.result);
                                    update(index, { name: file.name, content: e.target?.result });
                                  };
                                }
                              }}
                            />

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
                <div>
                  <Button type="button" onClick={() => remove(index)} variant={"secondary"} size={"sm"}>
                    Remove
                  </Button>
                </div>
              </section>
            ))}
          </div>

          <div>
            <Button type="button" onClick={() => append({ name: "", content: "" })} variant={"secondary"} size={"sm"}>
              Add document
            </Button>
          </div>

          <div>
            <Button>Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
