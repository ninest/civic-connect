import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { FormForm } from "@/app/[botSlug]/(admin-dashboard)/forms/form-form";
import { botService } from "@/services/bot";
import { formService } from "@/services/form";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);
  const forms = await formService.getMany(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Forms" }, { title: "New" }]}>
      <FormForm botId={bot.id} />
    </BotSubPageLayout>
  );
}
