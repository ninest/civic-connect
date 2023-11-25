import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotCategoryForm } from "@/app/[botSlug]/edit/bot-category-form";
import { botService } from "@/services/bot";
import { categoryService } from "@/services/category";

export default async function CategoryEditPage({ params }: { params: { botSlug: string; categoryId: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);

  return (
    <BotSubPageLayout crumbs={[{ title: "Edit" }, { title: "Category" }, { title: "New" }]}>
      <BotCategoryForm botId={bot.id} />
    </BotSubPageLayout>
  );
}
