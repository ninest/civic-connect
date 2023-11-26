import { MobileHeader } from "@/app/[botSlug]/mobile-header";
import { SidebarLink } from "@/app/[botSlug]/sidebar-link";
import { DemoSheet } from "@/app/demo-sheet";
import { Button } from "@/components/ui/button";
import { botService } from "@/services/bot";
import { PanelRight, Share2 } from "lucide-react";
import { ReactNode } from "react";

interface Params {
  botSlug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const bot = await botService.getBySlug(params.botSlug);
  return {
    title: { template: `%s - ${bot.name}`, default: bot.name },
  };
}

export default async function BotPageLayout({ params, children }: { params: Params; children: ReactNode }) {
  const bot = await botService.getBySlug(params.botSlug);

  const links = [
    { iconSlug: "Edit2", title: "Edit", href: `/${bot.slug}/edit` },
    { iconSlug: "File", title: "Documents", href: `/${bot.slug}/documents` },
    { iconSlug: "FormInput", title: "Forms", href: `/${bot.slug}/forms` },
    { iconSlug: "BarChart2", title: "Analytics", href: `/${bot.slug}/analytics` },
    { iconSlug: "Blocks", title: "Integrations", href: `/${bot.slug}/integrations` },
    { iconSlug: "MessagesSquare", title: "Conversations", href: `/${bot.slug}/conversations` },
  ];

  return (
    <>
      <main>
        {/* Desktop */}
        <div className="hidden md:flex h-screen">
          <aside className="fixed h-screen overflow-y-auto w-[18rem] border-r flex flex-col justify-between">
            <div>
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
            </div>

            <section className="p-5 flex items-center space-x-3">
              <DemoSheet bot={bot}>
                <Button variant={"secondary"} className="w-full">
                  Demo chatbot
                </Button>
              </DemoSheet>
              <Button variant={"outline"} size={"icon"} className="px-2">
                <Share2 className="w-4 h-4" />
              </Button>
            </section>
          </aside>
          <div className="ml-[18rem] flex-1 w-full">{children}</div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileHeader
            bot={bot}
            drawer={
              <section className="p-2 pl-3 space-y-2 mb-5">
                {links.map((link, i) => (
                  <div key={i}>
                    <SidebarLink {...link} />
                  </div>
                ))}
              </section>
            }
          />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
