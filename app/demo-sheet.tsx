"use client";

import { getMessagesAction } from "@/app/_actions/chat-actions";
import { Chat } from "@/components/chat";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bot, Message } from "@/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  bot: Bot;
}

export function DemoSheet({ bot }: Props) {
  const form = useForm({ defaultValues: { message: "" } });
  const [messages, setMessages] = useState<Message[]>([]);

  const onSubmit = form.handleSubmit(async (data) => {
    const previousMessages = [...messages, { from: "Me", me: true, content: data.message }];
    setMessages(previousMessages);

    form.setValue("message", "");

    const newMessages = await getMessagesAction(bot.id, previousMessages, true);
    setMessages(newMessages);
  });

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"secondary"} className="w-full">
            Demo chatbot
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="relative h-full">
            <Button variant={"secondary"} size={"sm"}>
              Reset
            </Button>
            <Spacer className="h-5" />

            <div className="h-full overflow-y-scroll pb-40">
              <Chat loading={form.formState.isSubmitting} messages={messages} />
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="relative">
                <Form {...form}>
                  <form onSubmit={onSubmit}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <Input {...field} className="z-0 text-lg px-5 py-6 pr-12" placeholder="Message Bot ..." />
                        </FormItem>
                      )}
                    />

                    <button className="absolute top-[0.55rem] right-[0.55rem] border rounded-sm p-2">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
