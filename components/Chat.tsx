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
    <ul className="space-y-4">
      {messages.map((message, i) => (
        <li key={i}>
          <b>{message.from}</b>
          <div className="mt-1">{message.content}</div>
        </li>
      ))}
    </ul>
  );
}
