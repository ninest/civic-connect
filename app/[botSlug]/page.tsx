import { BotEditForm } from "@/app/[botSlug]/edit-bot-form";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { botService } from "@/services/bot";

export default async function BotPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);

  return (
    <main className="space-x py-5">
      <Title level={1}>{bot.name}</Title>

      <Spacer className="h-5" />

      <BotEditForm botId={bot.id} defaultValues={bot} />
    </main>
  );
}
