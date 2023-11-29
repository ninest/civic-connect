"use client";

import { editFormFieldsAction } from "@/app/_actions/form-actions";
import { NoElementsEmpty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EditFormFieldsType, editFormFieldsSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  formId: string;
  defaultValues: EditFormFieldsType;
}

export function ForFieldsForm({ formId, defaultValues }: Props) {
  const form = useForm<EditFormFieldsType>({
    resolver: zodResolver(editFormFieldsSchema),
    defaultValues,
  });

  const { fields, append, remove, update } = useFieldArray({ name: "fields", control: form.control });

  const onSubmit = form.handleSubmit(async (data) => {
    await editFormFieldsAction(formId, data);
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            {fields.length === 0 && (
              <>
                <NoElementsEmpty children="No fields yet ..." />
              </>
            )}

            {fields.map((field, index) => (
              <section key={field.id} className="rounded-md border p-5 space-y-4">
                <FormField
                  control={form.control}
                  name={`fields.${index}.fieldName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`fields.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`fields.${index}.valueType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="string">Text</SelectItem>
                          <SelectItem value="number">number</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button type="button" onClick={() => remove(index)} variant={"secondary"} size={"sm"}>
                    Remove
                  </Button>
                </div>
              </section>
            ))}
          </div>

          <div>
            <Button
              type="button"
              onClick={() => append({ fieldName: "", valueType: "string", description: "" })}
              variant={"secondary"}
              size={"sm"}
            >
              Add field
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
