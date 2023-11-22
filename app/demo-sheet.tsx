"use client";

import { Chat } from "@/components/chat";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

export function DemoSheet() {
  const form = useForm({});

  const onSubmit = form.handleSubmit(async (data) => {});

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
            <Chat
              loading={false}
              messages={[
                {
                  from: "CivicConnect",
                  content:
                    "Hi I am CivicConnect. I am here to answer any questions you may have, but, keep in mind, I am still an AI representative and do not have all of the answers.",
                },
                { from: "Me", me: true, content: "What is Rep Moulton's position on the Inflation Reduction Act?" },
                // {
                //   from: "CivicConnect",
                //   content:
                //     "As an AI representative I am not qualified to speak on behalf of the Representatives beliefs. However, I am more than happy to take down your opinion and pass it on the a staffer. Can you verify your address/zip first?",
                // },
                // { from: "Me", me: true, content: "123 Boston Ave, Boston MA, 02120 " },
                // {
                //   from: "CivicConnect",
                //   content:
                //     "Thank you!  Your opinion has been noted. The Congressman appreciates you taking the time to leave your feedback.",
                // },
              ]}
            />

            <div className="absolute bottom-0 bg-white/90 left-0 right-0">
              <div className="space-x">
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
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
