import { cn } from "@/utils/style";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  href: Url;
  children: ReactNode;
}
export function LinkCard({ href, className, children }: Props) {
  return (
    <Link href={href} className={cn(className, "block border rounded-sm p-5")}>
      {children}
    </Link>
  );
}
