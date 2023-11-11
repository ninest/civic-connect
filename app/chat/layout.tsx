import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="sticky top-0 bg-white/90">
        <nav className="space-x py-3">
          <Button variant="outline" size="icon" asChild>
            <Link href={"/"}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
      <div className="py-5 space-x">{children}</div>
    </main>
  );
}
