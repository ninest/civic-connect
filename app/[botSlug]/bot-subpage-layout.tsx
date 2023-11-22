"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const BotSubPageLayout = ({
  crumbs,
  children,
}: {
  crumbs: { title: string; href?: string }[];
  children: ReactNode;
}) => {
  const path = usePathname();
  return (
    <>
      <header className="h-[4rem] flex px-5 items-center border-b">
        <div className="flex items-center space-x-2">
          {crumbs.map((crumb, i) => {
            if (i === 0)
              return (
                <Link key={i} href={crumb.href ?? path}>
                  <h1>{crumb.title}</h1>
                </Link>
              );
            else {
              const isLast = i === crumbs.length - 1;
              return (
                <Link key={i} href={crumb.href ?? path} className="flex items-center space-x-2">
                  <ChevronRight className="text-gray-500 w-5 h-5" />
                  <span>{crumb.title}</span>
                </Link>
              );
            }
          })}
        </div>
      </header>
      <div className="space-x py-8">{children}</div>
    </>
  );
};
