import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

export default function ChatPage() {
  return (
    <>
      <Chat
        messages={[
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
        ]}
      />
      <div className="fixed bottom-0 bg-white/90 left-0 right-0">
        <div className="space-x py-4">
          <div className="relative">
            <Input className="z-0 text-lg px-5 py-6 pr-12" placeholder="Message CongressBot ..." />

            <button className="absolute top-[0.55rem] right-[0.55rem] border rounded-sm p-2">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
