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
    { iconSlug: "FormInput", title: "Forms", href: `/${bot.slug}/forms` },
    { iconSlug: "BarChart2", title: "Analytics", href: `/${bot.slug}/analytics` },
  ];

  return (
    <>
      <main className="flex h-screen">
        <aside className="w-[20rem] border-r">
          <div className="h-[4rem] border-b flex items-center px-5">
            <h1 className="font-black text-lg">{bot.name}</h1>
          </div>

          <section className="p-5 pl-8 space-y-3">
            {links.map((link, i) => (
              <div key={i}>
                <SidebarLink {...link} />
              </div>
            ))}
          </section>
        </aside>
        <div className="flex-1 w-full">{children}</div>
      </main>
    </>
  );
}
