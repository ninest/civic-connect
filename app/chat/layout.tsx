import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return <main className="md:max-w-[60ch] lg:max-w-[80ch] py-5 mx-5 md:mx-auto">{children}</main>;
}
