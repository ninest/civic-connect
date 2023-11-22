import { botService } from "@/services/bot";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBotBySlug(params.botSlug);

  return redirect(`/${bot.slug}/edit`);
}
