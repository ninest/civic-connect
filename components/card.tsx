import { cn } from "@/utils/style";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  href?: Url;
  children: ReactNode;
}
export function Card({ href, className, children }: Props) {
  const classes = cn("block border rounded-sm p-5", className);

  if (href)
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  else return <div className={classes}>{children}</div>;
}
