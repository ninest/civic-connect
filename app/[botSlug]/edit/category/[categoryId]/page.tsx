import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotCategoryForm } from "@/app/[botSlug]/edit/bot-category-form";
import { categoryService } from "@/services/category";

export default async function CategoryEditPage({ params }: { params: { categoryId: string } }) {
  const category = await categoryService.get(params.categoryId);

  return (
    <BotSubPageLayout
      crumbs={[{ title: "Edit" }, { title: "Category" }, { title: `${category.name}` }]}
    >
      <BotCategoryForm categoryId={category.id} defaultValues={category}/>
    </BotSubPageLayout>
  );
}
