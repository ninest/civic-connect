import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { LinkCard } from "@/components/card";
import { Empty, NoElementsEmpty } from "@/components/empty";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { urls } from "@/urls";
import { iconClassesL, iconClassesR } from "@/utils/icon";
import { pluralize } from "@/utils/string";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);
  const forms = await formService.getForms(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }]}>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={urls.bot.createForm(bot.slug)}>
            <Plus className={iconClassesL} />
            Create form
          </Link>
        </Button>
      </div>

      <Spacer className="h-5" />

      {forms.length === 0 ? (
        <>
          <NoElementsEmpty children="No forms yet ..." />
        </>
      ) : (
        <div className="space-y-5">
          {forms.map((form, i) => (
            <LinkCard key={i} href={urls.bot.editForm(bot.slug, form.id)} className="flex justify-between">
              <div>
                <b>{form.name}</b>
                <Spacer className="h-1" />
                <div>{form.description}</div>
              </div>
              <div className="text-muted-foreground">
                {form.fields.length} {pluralize(form.fields.length, "field", "fields")}
              </div>
            </LinkCard>
          ))}
        </div>
      )}
    </BotSubPageLayout>
  );
}
