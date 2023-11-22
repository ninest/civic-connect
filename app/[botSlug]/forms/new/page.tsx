import { BotSubPageLayout } from "@/app/[botSlug]/bot-subpage-layout";
import { FormForm } from "@/app/[botSlug]/forms/form-form";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);
  const forms = await formService.getForms(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }, { title: "New" }]}>
      <FormForm botId={bot.id} />
    </BotSubPageLayout>
  );
}
