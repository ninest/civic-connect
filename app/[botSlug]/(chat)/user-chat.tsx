"use client";

import { getMessagesAction } from "@/app/_actions/chat-actions";
import { Chat } from "@/components/chat";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Bot, FormWithBotIdWithFields, Message } from "@/types";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  bot: Bot;
  forms: FormWithBotIdWithFields[];
}

export function UserChat({ bot, forms }: Props) {
  const form = useForm({ defaultValues: { message: "" } });
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<null | string>();

  const onSubmit = form.handleSubmit(async (data) => {
    const previousMessages: Message[] = [...messages, { type: "human", content: data.message }];
    setMessages(previousMessages);
    form.setValue("message", "");

    const { messages: newMessages, conversationId: existingConversationId } = await getMessagesAction(
      bot.id,
      previousMessages,
      { save: true, conversationId }
    );
    setMessages(newMessages);
    if (existingConversationId) {
      setConversationId(existingConversationId);
      window.location.hash = existingConversationId;
    }
  });

  return (
    <>
      <div className=" space-x h-full overflow-y-scroll pb-52">
        <Chat loading={form.formState.isSubmitting} messages={messages} debug={false} />
      </div>

      <div className=" sticky space-x bottom-5 left-0 right-0">
        <div className="space-y-2 mb-2">
          {forms.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                form.setValue("message", f.prompt);
                onSubmit();
              }}
              className="text-left bg-gray-50 p-2 text-sm rounded-md flex items-center"
            >
              <span>{f.prompt}</span>
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
    </>
  );
}
