import { NewBotForm } from "@/app/new-bot/new-bot-form";
import { Spacer } from "@/components/spacer";
import { Title } from "@/components/typography/title";

export default async function NewBotPage() {
  return (
    <main className="space-x py-5">
      <Title level={1}>New Bot</Title>

      <Spacer className="h-5" />

      <NewBotForm />
    </main>
  );
}
