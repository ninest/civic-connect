"use client";

import { sendMessagesAndGet } from "@/app/_actions/chat";
import { Chat, ChatProps } from "@/components/chat";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ChatForm() {
  const [messages, setMessages] = useState<ChatProps["messages"]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({});

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);

    form.setValue("message", "");

    setMessages([...messages, { me: true, from: "Me", content: data.message }]);

    let next = await sendMessagesAndGet(messages, data.message);
    setMessages(next);

    setLoading(false);
  });

  return (
    <>
      <Chat messages={messages} loading={loading} />
      <div className="fixed bottom-0 bg-white/90 left-0 right-0">
        <div className="space-x py-4">
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
    </>
  );
}
