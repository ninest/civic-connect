import { Chat } from "@/components/Chat";

export default function ChatPage() {
  return (
    <>
      <Chat
        messages={[
          { from: "AI", content: "Hello! How can I help you today?" },
          { from: "Me", me: true, content: "I lost my passport and I am stuck in the Maldives" },
        ]}
      />
    </>
  );
}
