import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotDocumentsForm } from "@/app/[botSlug]/documents/documents-bot-form";
import { botService } from "@/services/bot";
import { documentService } from "@/services/document";

export default async function BotPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
  const documents = await documentService.getAllDocuments(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Documents" }]}>
      <BotDocumentsForm botId={bot.id} defaultValues={{ ...bot, documents }} />
    </BotSubPageLayout>
  );
}
