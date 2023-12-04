import { UserChat } from "@/app/[botSlug]/(chat)/user-chat";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { Metadata } from "next";

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
      <main className="h-screen  space-x">
        <Spacer className="h-3" />
        <Title level={1}>{bot.name}</Title>

        <Spacer className="h-5" />
        <UserChat bot={bot} forms={forms} />
      </main>
    </>
  );
}
