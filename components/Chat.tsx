import { cn } from "@/utils/style";
import { ReactNode } from "react";

export interface ChatProps {
  messages: {
    from: string;
    me?: boolean;
    content: ReactNode | string;
  }[];
  loading: boolean;
}

export function Chat({ messages, loading }: ChatProps) {
  return (
    <div className="text-sm">
      <ul className="space-y-5 md:space-y-5">
        {messages.map((message, i) => (
          <div key={i} className={cn("block", { "bg-gray-100": message.me })}>
            <div className={cn({ "block bg-gray-100 p-2 md:p-3 rounded-md": message.me })}>
              <b>{message.from}</b>
              <div className="mt-1 space-y-2">{message.content}</div>
            </div>
          </div>
        ))}
        {loading && <div>Loading ...</div>}
      </ul>
    </div>
  );
}
