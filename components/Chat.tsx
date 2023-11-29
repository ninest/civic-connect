"use client";

import { Message } from "@/types";
import { cn } from "@/utils/style";
import { ComponentProps, useState } from "react";

export interface ChatProps {
  messages: Message[];
  loading: boolean;
  debug?: boolean;
}

export function Chat({ messages, loading, debug = false }: ChatProps) {
  const messageContentClasses = "mt-1 space-y-2 whitespace-break-spaces";

  return (
    <div className="text-sm">
      <ul className="space-y-5 md:space-y-5">
        {messages
          .filter((message) => (debug ? true : ["ai", "human"].includes(message.type)))
          .map((message, i) => {
            if (message.type === "human") {
              return (
                <div key={i} className="bg-gray-100 rounded-md p-2">
                  <b>Me</b>
                  <ContentClamper initiallyClamped={true} className={messageContentClasses}>
                    {message.content}
                  </ContentClamper>
                </div>
              );
            } else if (message.type === "ai") {
              return (
                <div key={i}>
                  <b>{message.from}</b>
                  <ContentClamper initiallyClamped={true} className={messageContentClasses}>
                    {message.content}
                  </ContentClamper>
                </div>
              );
            } else if (message.type === "system") {
              return (
                <div key={i}>
                  <b className="font-mono">System</b>
                  <ContentClamper initiallyClamped={true} className={messageContentClasses}>
                    {message.content}
                  </ContentClamper>
                </div>
              );
            } else if (message.type === "function") {
              const keyValues = Object.entries(message.arguments);
              return (
                <div key={i}>
                  <b>Form submission</b>
                  <ContentClamper initiallyClamped={true} className={messageContentClasses}>
                    <div>
                      {keyValues.map((kv) => (
                        <div key={kv[0]}>
                          <span className="text-sm font-mono text-muted-foreground">{kv[0]}</span>: {kv[1] as string}
                        </div>
                      ))}
                    </div>
                    <div>{message.content}</div>
                  </ContentClamper>
                </div>
              );
            }
          })}
        {loading && <div>Loading ...</div>}
      </ul>
    </div>
  );
}

function ContentClamper({
  clampClasses = "line-clamp-5",
  initiallyClamped = false,
  className,
  children,
}: ComponentProps<"div"> & { initiallyClamped?: boolean; clampClasses?: string }) {
  const [clamped, setClamped] = useState(initiallyClamped);
  return (
    <div onClick={() => setClamped(!clamped)} className={cn({ [`${clampClasses}`]: clamped }, className)}>
      {children}
    </div>
  );
}
