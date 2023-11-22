import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotEditForm } from "@/app/[botSlug]/edit/edit-bot-form";
import { botService } from "@/services/bot";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);

  return (
    <BotSubPageLayout crumbs={[{ title: "Edit" }]}>
      <BotEditForm botId={bot.id} defaultValues={bot} />
    </BotSubPageLayout>
  );
}
