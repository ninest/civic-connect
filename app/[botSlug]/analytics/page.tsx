import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { botService } from "@/services/bot";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);

  return <BotSubPageLayout crumbs={[{ title: "Analytics" }]}>TODO</BotSubPageLayout>;
}
