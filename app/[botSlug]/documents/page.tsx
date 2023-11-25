import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotDocumentsForm } from "@/app/[botSlug]/documents/documents-bot-form";
import { Spacer } from "@/components/spacer";
import { FormDescription } from "@/components/ui/form";
import { botService } from "@/services/bot";
import { documentService } from "@/services/document";
import { urls } from "@/urls";
import Link from "next/link";

export default async function BotPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);
  const documents = await documentService.getAllDocuments(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Documents" }]}>
      <p className="text-sm text-muted-foreground">
        Remember to update{" "}
        <Link className="underline" href={urls.bot.edit(params.botSlug)}>
          the bot description
        </Link>{" "}
        with details on documents uploaded.
      </p>

      <Spacer className="h-5" />

      <BotDocumentsForm botId={bot.id} defaultValues={{ ...bot, documents }} />
    </BotSubPageLayout>
  );
}
