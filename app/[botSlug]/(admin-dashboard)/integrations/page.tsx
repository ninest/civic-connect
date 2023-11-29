import { BotSubPageLayout } from "@/app/[botSlug]/(admin-dashboard)/bot-subpage-layout";
import { Card } from "@/components/card";
import { Spacer } from "@/components/spacer";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";

export default async function BotEditPage({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);

  const integrations = [{ name: "Slack", description: "Send form submissions to a Slack channel." }];

  return (
    <BotSubPageLayout crumbs={[{ title: "Integrations" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integrations.map((integration) => (
          <Card key={integration.name}>
            <div className="font-bold">{integration.name}</div>
            <Spacer className="h-1" />
            <div>{integration.description}</div>
            <Spacer className="h-4" />

            <Button variant={"secondary"}>Connect</Button>
          </Card>
        ))}
      </div>
    </BotSubPageLayout>
  );
}
