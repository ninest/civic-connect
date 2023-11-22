"use client";

import { IconSlug, iconMap } from "@/utils/icon";
import { cn } from "@/utils/style";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

export const SidebarLink = ({ iconSlug, title, href }: { iconSlug: IconSlug; title: string; href: string }) => {
  const path = usePathname();
  const active = path.startsWith(href);
  const Icon = iconMap[iconSlug];

  return (
    <Link
      href={href}
      className={cn("-m-2 py-2 px-3 rounded-sm flex items-center space-x-3 text-sm", {
        "hover:bg-gray-100": !active,
        "bg-gray-100 before:absolute before:-ml-[1.45rem] before:mb-0.5 before:rounded before:bg-primary before:w-1.5 before:h-7": active,
      })}
    >
      <div className="">
        <Icon className="w-4 h-4" />
      </div>
      <div>{title}</div>
    </Link>
  );
};
