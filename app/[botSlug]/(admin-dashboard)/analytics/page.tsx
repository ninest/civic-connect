import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { Card } from "@/components/card";
import { Spacer } from "@/components/spacer";
import { botService } from "@/services/bot";
import { categoryService } from "@/services/category";
import { conversationService } from "@/services/conversation";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);
  const count = await conversationService.count(bot.id);
  const categoriesWithCount = await categoryService.getConversationCount(bot.id);

  return (
    <BotSubPageLayout crumbs={[{ title: "Analytics" }]}>
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <div className="font-black text-3xl font-mono">{count}</div>
          <div>conversations</div>
        </Card>
        <Card className="col-span-2">
          <div className="font-bold">By category</div>
          <Spacer className="h-3" />
          <div className="space-y-1">
            {categoriesWithCount.map((cwc) => {
              const barLength = (cwc.conversationsCount / count) * 100;
              return (
                <div key={cwc.id} className="h-7 rounded-sm bg-primary-foreground relative">
                  <div className="h-full bg-primary/20 rounded-l-sm" style={{ width: `${barLength}%` }}></div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-2 z-100 text-xs font-semibold ">
                    {cwc.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </BotSubPageLayout>
  );
}
