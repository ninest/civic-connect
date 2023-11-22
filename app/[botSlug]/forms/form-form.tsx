"use client";

import { createFormAction, editFormAction } from "@/app/_actions/form-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormFormSchema, FormFormType } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  botId: string;
  formId?: string;
  defaultValues?: Partial<FormFormType>;
}

export function FormForm({ botId, formId, defaultValues }: Props) {
  const editing = !!formId;
  const form = useForm<FormFormType>({ resolver: zodResolver(FormFormSchema), defaultValues });

  const onSubmit = form.handleSubmit(async (data) => {
    if (editing) await editFormAction(botId, data);
    else await createFormAction(botId, data);
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
                <FormLabel>Name</FormLabel>
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
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Save</Button>
        </form>
      </Form>
    </>
  );
}
