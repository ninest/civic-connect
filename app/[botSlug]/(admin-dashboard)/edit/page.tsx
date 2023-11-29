import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { BotEditForm } from "@/app/[botSlug]/(admin-dashboard)/edit/edit-bot-form";
import { Card } from "@/components/card";
import { NoElementsEmpty } from "@/components/empty";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { urls } from "@/urls";
import Link from "next/link";

interface Params {
  botSlug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: "Edit",
  };
}

export default async function BotEditPage({ params }: { params: Params }) {
  const bot = await botService.getBySlug(params.botSlug);
  const categories = bot.categories;

  return (
    <BotSubPageLayout crumbs={[{ title: "Edit" }]}>
      <BotEditForm botId={bot.id} defaultValues={bot} />

      <Spacer className="h-5" />
      <hr />
      <Spacer className="h-5" />

      <Title level={2}>Categories</Title>
      <Spacer className="h-5" />
      {categories.length === 0 && (
        <>
          <NoElementsEmpty children="No categories yet ..." />
        </>
      )}
      <div className="space-y-5">
        {categories.map((category) => (
          <Card key={category.id} href={urls.bot.editCategory(bot.slug, category.id)}>
            <b>{category.name}</b>
            <Spacer className="h-1" />
            <div className="text-muted-foreground">{category.description}</div>
          </Card>
        ))}
      </div>
      <Spacer className="h-5" />
      <Button asChild variant={"secondary"}>
        <Link href={urls.bot.createCategory(bot.slug)}>Add</Link>
      </Button>
    </BotSubPageLayout>
  );
}
