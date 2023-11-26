"use client";

import { DemoSheet } from "@/app/demo-sheet";
import { Button } from "@/components/ui/button";
import { Bot } from "@/types";
import { MessageSquare, PanelRight } from "lucide-react";
import { ReactNode, useState } from "react";

export function MobileHeader({ bot, drawer }: { bot: Bot; drawer: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b px-5">
      <div className="h-[4rem] flex items-center justify-between">
        <h1 className="font-black text-lg">{bot.name}</h1>
        <div className="flex items-center space-x-2">
          <DemoSheet bot={bot}>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </DemoSheet>
          <Button onClick={() => setDrawerOpen(!drawerOpen)} variant="outline" size="icon">
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {drawerOpen && <>{drawer}</>}
    </header>
  );
}
