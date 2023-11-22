import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { botService } from "@/services/bot";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);

  return <BotSubPageLayout title={"Analytics"}>
    TODO
  </BotSubPageLayout>;
}
