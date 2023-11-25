import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { BotEditForm } from "@/app/[botSlug]/edit/edit-bot-form";
import { LinkCard } from "@/components/card";
import { NoElementsEmpty } from "@/components/empty";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { urls } from "@/urls";
import Link from "next/link";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
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
          <LinkCard key={category.id} href={urls.bot.editCategory(bot.slug, category.id)}>
            <b>{category.name}</b>
            <Spacer className="h-1" />
            <div className="text-muted-foreground">{category.description}</div>
          </LinkCard>
        ))}
      </div>
      <Spacer className="h-5" />
      <Button asChild variant={"secondary"}>
        <Link href={urls.bot.createCategory(bot.slug)}>Add</Link>
      </Button>
    </BotSubPageLayout>
  );
}
