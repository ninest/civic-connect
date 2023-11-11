import { iconClasses } from "@/utils/icon";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface LinkSourceProps {
  title: string;
  url: string;
}

export function LinkSource({ title, url }: LinkSourceProps) {
  const displayUrl = url.split("//")[1].split("/")[0];
  return (
    <Link href={url} className="block border p-3 rounded-sm">
      <div className="flex items-center justify-between font-semibold">
        <span>{title}</span>
        <ExternalLink className={iconClasses} />
      </div>
      <p className="font-mono text-xs">{displayUrl}</p>
    </Link>
  );
}
