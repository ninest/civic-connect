import { UserChat } from "@/app/[botSlug]/(chat)/user-chat";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { urls } from "@/urls";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat",
};

interface Props {
  params: { botSlug: string };
}

export default async function ChatPage({ params }: Props) {
  const bot = await botService.getBySlug(params.botSlug);
  const forms = await formService.getMany(bot.id);

  return (
    <>
      <main className="min-h-screen [--top-bar-height:4rem]">
        <div className="h-[--top-bar-height] w-full sticky top-0 bg-white border-b">
          <div className="h-full md:max-w-[50rem] md:px-0 mx-auto px-5 w-full flex items-center justify-between">
            <div className="font-bold">{bot.name}</div>
            <Button variant={"outline"} size={"sm"} asChild>
              <a href={urls.chat(bot.slug)}>Reset</a>
            </Button>
          </div>
        </div>

        <UserChat bot={bot} forms={forms} />
      </main>
    </>
  );
}
