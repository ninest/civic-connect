import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotCategoryForm } from "@/app/[botSlug]/edit/bot-category-form";
import { botService } from "@/services/bot";

export default async function CategoryEditPage({ params }: { params: { botSlug: string; categoryId: string } }) {
  const bot = await botService.getBySlug(params.botSlug);

  return (
    <BotSubPageLayout crumbs={[{ title: "Edit" }, { title: "Category" }, { title: "New" }]}>
      <BotCategoryForm type="create" botId={bot.id} />
    </BotSubPageLayout>
  );
}
