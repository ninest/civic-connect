import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import {
  ConversationRow,
  conversationColumns,
} from "@/app/[botSlug]/(admin-dashboard)/conversations/conversations-table";
import { DataTable } from "@/app/[botSlug]/(admin-dashboard)/conversations/data-table";
import { botService } from "@/services/bot";
import { conversationService } from "@/services/conversation";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);
  const conversations = await conversationService.getMany(bot.id);

  const data: ConversationRow[] = conversations.map((c) => ({
    name: c.name,
    numMessages: c.messages.length,
    categories: c.categories.map((c) => c.name).join(", "),
  }));

  return (
    <BotSubPageLayout crumbs={[{ title: "Conversations" }]}>
      <DataTable columns={conversationColumns} data={data} />
    </BotSubPageLayout>
  );
}
