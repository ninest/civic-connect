"use client";

import { getMessagesAction } from "@/app/_actions/chat-actions";
import { Chat } from "@/components/chat";
import { Spacer } from "@/components/spacer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bot, FormWithBotIdWithFields, Message } from "@/types";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";

interface Props extends ComponentProps<"div"> {
  bot: Bot;
  forms: FormWithBotIdWithFields[];
}

export function DemoSheet({ bot, forms, children }: Props) {
  const [debugMode, setDebugMode] = useState(true);
  const form = useForm({ defaultValues: { message: "" } });
  const [messages, setMessages] = useState<Message[]>([]);

  const onSubmit = form.handleSubmit(async (data) => {
    const previousMessages: Message[] = [...messages, { type: "human", content: data.message }];
    setMessages(previousMessages);

    form.setValue("message", "");

    const { messages: newMessages } = await getMessagesAction(bot.id, previousMessages, { debug: true });
    setMessages(newMessages);
  });

  const reset = () => {
    setMessages([]);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>
          <div className="relative h-full">
            <div className="flex items-center space-x-2">
              <Button onClick={reset} variant={"secondary"} size={"sm"}>
                Reset
              </Button>
              <Button onClick={() => setDebugMode(!debugMode)} variant={"secondary"} size={"sm"}>
                Debug mode: {debugMode ? "on" : "off"}
              </Button>
            </div>
            <Spacer className="h-5" />

            <div className="h-full overflow-y-scroll pb-96">
              <Chat loading={form.formState.isSubmitting} messages={messages} debug={debugMode} />
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="space-y-2 mb-2">
                {bot.conversationStarters.map((starter, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      form.setValue("message", starter);
                      onSubmit();
                    }}
                    className="text-left bg-gray-50 p-2 text-sm rounded-md flex items-center"
                  >
                    <span>{starter}</span>
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </button>
                ))}
              </div>
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
