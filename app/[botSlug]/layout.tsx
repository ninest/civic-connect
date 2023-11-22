import { SidebarLink } from "@/app/[botSlug]/sidebar-link";
import { Spacer } from "@/components/spacer";
import { botService } from "@/services/bot";
import { Edit } from "lucide-react";
import { ReactNode } from "react";

export default async function BotPageLayout({
  params,
  children,
}: {
  params: { botSlug: string };
  children: ReactNode;
}) {
  const bot = await botService.getBotBySlug(params.botSlug);

  const links = [
    { iconSlug: "Edit2", title: "Edit", href: `/${bot.slug}/edit` },
    { iconSlug: "File", title: "Documents", href: `/${bot.slug}/documents` },
  ];

  return (
    <>
      <main className="flex h-screen">
        <aside className="w-[20rem] bg-white p-5 border-r">
          <h1 className="font-black text-lg">{bot.name}</h1>
          <Spacer className="h-8" />

          <section className="space-y-4">
            {links.map((link, i) => (
              <SidebarLink key={i} {...link} />
            ))}
          </section>
        </aside>
        <div className="flex-1 w-full space-x py-5">{children}</div>
      </main>
    </>
  );
}
