import { BotDocumentsForm } from "@/app/[botSlug]/documents/documents-bot-form";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { botService } from "@/services/bot";
import { documentService } from "@/services/document";

export default async function BotPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
  const documents = await documentService.getAllDocuments(bot.id);

  return (
    <>
      <Title level={1}>Edit Documents</Title>

      <Spacer className="h-5" />

      <BotDocumentsForm botId={bot.id} defaultValues={{ ...bot, documents }} />
    </>
  );
}
