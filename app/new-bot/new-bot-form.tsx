"use client";

import { newBotAction } from "@/app/new-bot/new-bot-actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewBotFormType, newBotFormSchema } from "@/services/bot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const NewBotForm = () => {
  const form = useForm<NewBotFormType>({
    resolver: zodResolver(newBotFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await newBotAction(data);
  });

  return (
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
        <Button>Submit</Button>
      </form>
    </Form>
  );
};
