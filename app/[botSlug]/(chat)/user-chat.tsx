"use client";

import { getMessagesAction } from "@/app/_actions/chat-actions";
import { Chat } from "@/components/chat";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Bot, FormWithBotIdWithFields, Message } from "@/types";
import { ArrowRight, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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

  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = form.handleSubmit(async (data) => {
    if (form.formState.isLoading) return;

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
      console.log(existingConversationId);
    }
  });

  return (
    <>
      <div className="md:max-w-[50rem] md:px-0 mx-auto px-5 h-[calc(100vh-var(--top-bar-height))] ">
        <Spacer className="h-5" />
        <Chat
          loading={form.formState.isSubmitting}
          messages={[
            ...messages,
            // { type: "human", content: "Hello" }
          ]}
          debug={false}
        />
        <Spacer className="h-[20rem]" />

        <div className="fixed bottom-0 left-0 right-0 bg-white py-5 border-t">
          <div className="md:max-w-[50rem] md:px-0 mx-auto px-5 mb-5 grid grid-cols-2 gap-5">
            {bot.conversationStarters.map((starter, i) => (
              <button
                key={i}
                onClick={() => {
                  form.setValue("message", starter);
                  onSubmit();
                }}
                className="bg-gray-50 p-2 rounded-md text-sm text-left flex items-center justify-between"
              >
                <span>{starter}</span>
                <ArrowRight className="ml-2 w-3 h-3" />
              </button>
            ))}
          </div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="md:max-w-[50rem] md:px-0 mx-auto px-5">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Input {...field} className="z-0 text-lg px-5 py-6 pr-12" placeholder="Message Bot ..." />
                    <button
                      disabled={form.formState.isLoading}
                      className="absolute top-0 right-[0.45rem] border rounded-sm p-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
    // <>
    //   <div className="space-x h-full overflow-y-scroll pb-52">
    //     <Chat loading={form.formState.isSubmitting} messages={messages} debug={false} />
    //   </div>

    //   <div className="sticky space-x bottom-5 left-0 right-0">
    //     <div className="space-y-2 mb-2">
    //       {bot.conversationStarters.map((starter, i) => (
    //         <button
    //           key={i}
    //           onClick={() => {
    //             form.setValue("message", starter);
    //             onSubmit();
    //           }}
    //           className="text-left bg-gray-50 p-2 text-sm rounded-md flex items-center"
    //         >
    //           <span>{starter}</span>
    //           <ArrowRight className="ml-2 w-3 h-3" />
    //         </button>
    //       ))}
    //     </div>
    //     <div className="relative">
    //       <Form {...form}>
    //         <form onSubmit={onSubmit}>
    //           <FormField
    //             control={form.control}
    //             name="message"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <Input {...field} className="z-0 text-lg px-5 py-6 pr-12" placeholder="Message Bot ..." />
    //               </FormItem>
    //             )}
    //           />

    //           <button className="absolute top-[0.55rem] right-[0.55rem] border rounded-sm p-2">
    //             <ChevronRight className="h-4 w-4" />
    //           </button>
    //         </form>
    //       </Form>
    //     </div>
    //   </div>
    // </>
  );
}
