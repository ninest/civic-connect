"use client";

import { editBotAction } from "@/app/_actions/bot-actions";
import { Debug } from "@/components/debug";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditBotFormType, editBotFormSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  botId: string;
  defaultValues: Partial<EditBotFormType>;
}

export function BotEditForm({ botId, defaultValues }: Props) {
  const form = useForm<EditBotFormType>({
    resolver: zodResolver(editBotFormSchema),
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description,
      documents: defaultValues.documents,
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    name: "documents",
    control: form.control,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await editBotAction(botId, data);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bot name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Title level={2}>Documents</Title>

          {fields.map((field, index) => (
            <section key={field.id} className="rounded-md p-5 border flex items-center justify-between">
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
                        <FormItem>
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
                <Button type="button" onClick={() => remove(index)} variant={"secondary"}>
                  Remove
                </Button>
              </div>
            </section>
          ))}

          <div>
            <Button type="button" onClick={() => append({ name: "", content: "" })} variant={"secondary"}>
              Add document
            </Button>
          </div>

          <div>
            <Button>Save</Button>
          </div>
        </form>
      </Form>

      {/* <Debug className="mt-5" data={form.watch()} /> */}
    </>
  );
}
