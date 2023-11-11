import { cn } from "@/utils/style";
import { ReactNode } from "react";

interface ChatProps {
  messages: {
    from: string;
    me?: boolean;
    content: ReactNode;
  }[];
}

export function Chat({ messages }: ChatProps) {
  return (
    <div>
      <ul className="space-y-10 md:space-y-10 mb-40">
        {messages.map((message, i) => (
          <div key={i} className={cn("block", { "bg-gray-100": message.me })}>
            <div className={cn({ "block bg-gray-100 -m-2 p-2 md:-m-3 md:p-3 rounded-md": message.me })}>
              <b>{message.from}</b>
              <div className="mt-1 space-y-2">{message.content}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
