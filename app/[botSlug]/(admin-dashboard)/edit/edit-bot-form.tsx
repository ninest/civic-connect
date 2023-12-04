"use client";

import { editBotAction } from "@/app/_actions/bot-actions";
import { NoElementsEmpty } from "@/components/empty";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditBotFormType, editBotFormSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  botId: string;
  defaultValues: Partial<EditBotFormType>;
}

export function BotEditForm({ botId, defaultValues }: Props) {
  const isEditing = !!botId;
  const form = useForm<EditBotFormType>({
    resolver: zodResolver(editBotFormSchema),
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description,
      conversationStarters: defaultValues.conversationStarters,
    },
  });

  const { fields, append, remove } = useFieldArray({ name: "conversationStarters", control: form.control });

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
                  <Textarea {...field} rows={10} />
                </FormControl>
                <FormDescription>
                  This should contain information on who the bot is and what it can answer questions on. Include
                  information on what the documents are about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing && (
            <div>
              <FormLabel >Conversations starters</FormLabel>
              <Spacer className="h-2"/>
              {fields.length === 0 && (
                <>
                  <NoElementsEmpty children="No conversation starters yet ..." />
                </>
              )}
              <section className="space-y-2 mb-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="w-full flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name={`conversationStarters.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button onClick={() => remove(index)} variant={"ghost"}>
                      Remove
                    </Button>
                  </div>
                ))}
              </section>

              <Button onClick={() => append({ text: "" })} variant={"secondary"}>
                Add
              </Button>
            </div>
          )}

          <div>
            <Button>Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
