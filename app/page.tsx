import { Button } from "@/components/ui/button";
import { iconClassesR } from "@/utils/icon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-5 mx-auto">
      <Button variant={"secondary"} asChild>
        <Link href={"/chat"}>
          Example 1 <ArrowRight className={iconClassesR} />
        </Link>
      </Button>
    </main>
  );
}
