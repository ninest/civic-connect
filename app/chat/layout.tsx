import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <main className="py-5 space-x">{children}</main>;
}
