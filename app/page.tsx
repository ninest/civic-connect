import { Button } from "@/components/ui/button";
import { iconClassesR } from "@/utils/icon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-5 mx-auto flex gap-2 flex-wrap">
      <Button variant={"secondary"} asChild>
        <Link href={"/chat/opinion"}>
          Opinion Example <ArrowRight className={iconClassesR} />
        </Link>
      </Button>
      <Button variant={"secondary"} asChild>
        <Link href={"/chat/stuck"}>
          Maldives Example <ArrowRight className={iconClassesR} />
        </Link>
      </Button>
      <Button variant={"secondary"} asChild>
        <Link href={"/chat/shutdown"}>
          Shutdown and Source Example <ArrowRight className={iconClassesR} />
        </Link>
      </Button>
    </main>
  );
}
