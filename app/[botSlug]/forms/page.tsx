import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { Empty } from "@/components/loading";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";
import { iconClassesL, iconClassesR } from "@/utils/icon";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
  const forms = await formService.getForms(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }]}>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={`/${bot.slug}/forms/new`}>
            <Plus className={iconClassesL} />
            Create form
          </Link>
        </Button>
      </div>

      <Spacer className="h-5" />

      {forms.length === 0 ? (
        <>
          <Empty className="p-5 text-center">No forms yet ...</Empty>
        </>
      ) : (
        <div className="space-y-5">
          {forms.map((form, i) => (
            <div key={i} className="border rounded-sm p-5 flex flex-col">
              <b>{form.name}</b>
              <Spacer className="h-1" />
              <div>{form.description}</div>
            </div>
          ))}
        </div>
      )}
    </BotSubPageLayout>
  );
}
