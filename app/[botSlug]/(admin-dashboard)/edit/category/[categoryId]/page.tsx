import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { BotCategoryForm } from "@/app/[botSlug]/(admin-dashboard)/edit/bot-category-form";
import { categoryService } from "@/services/category";
import { urls } from "@/urls";

export default async function CategoryEditPage({ params }: { params: { botSlug: string; categoryId: string } }) {
  const category = await categoryService.get(params.categoryId);

  return (
    <BotSubPageLayout crumbs={[{ title: "Edit" }, { title: "Category" }, { title: `${category.name}` }]}>
      <BotCategoryForm
        type="edit"
        categoryId={category.id}
        defaultValues={category}
        deleteRedirectHref={urls.bot.edit(params.botSlug)}
      />
    </BotSubPageLayout>
  );
}
