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
        </form>
      </Form>
    </>
  );
}
