import { ChatForm } from "@/app/chat/[botSlug]/chat-form";

export default async function ChatPage({ params }: { params: { botSlug: string } }) {
  return (
    <>
      <main className="space-x py-5">
        <ChatForm />
      </main>
    </>
  );
}
