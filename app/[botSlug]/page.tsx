import { botService } from "@/services/bot";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: { botSlug: string } }) {
  const bot = await botService.getBySlug(params.botSlug);

  return redirect(`/${bot.slug}/edit`);
}
