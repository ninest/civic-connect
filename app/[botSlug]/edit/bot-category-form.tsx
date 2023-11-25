"use client";

import { addCategoryAction, editCategoryAction } from "@/app/_actions/category-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditCategoryFormType, editCategoryFormSchema } from "@/services/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import invariant from "tiny-invariant";

interface Props {
  botId?: string;
  categoryId?: string;
  defaultValues?: Partial<EditCategoryFormType>;
}

export function BotCategoryForm({ botId, categoryId, defaultValues }: Props) {
  const editing = !!categoryId && !botId;
  const form = useForm<EditCategoryFormType>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (editing) await editCategoryAction(categoryId, data);
    else {
      invariant(botId);
      await addCategoryAction(botId, data);
    }
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

          <Button>Save</Button>
        </form>
      </Form>
    </>
  );
}
