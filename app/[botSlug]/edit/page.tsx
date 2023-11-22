import { BotEditForm } from "@/app/[botSlug]/edit/edit-bot-form";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { botService } from "@/services/bot";
import { documentService } from "@/services/document";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
  const documents = await documentService.getAllDocuments(bot.id);

  return (
    <>
      <Title level={1}>Edit Bot</Title>
      <Spacer className="h-5" />
      <BotEditForm botId={bot.id} defaultValues={{ ...bot, documents }} />
    </>
  );
}
