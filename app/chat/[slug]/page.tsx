import { Chat } from "@/components/Chat";
import { LinkSource } from "@/components/LinkSource";
import { Rating } from "@/components/Rating";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";

export default function ChatPage({ params }: { params: { slug: string } }) {
  const samples = {
    opinion: [
      {
        from: "CivicConnect",
        content:
          "Hi I am CivicConnect. I am here to answer any questions you may have, but, keep in mind, I am still an AI representative and do not have all of the answers.",
      },
      { from: "Me", me: true, content: "What is Rep Moulton's position on the Inflation Reduction Act?" },
      {
        from: "CivicConnect",
        content:
          "As an AI representative I am not qualified to speak on behalf of the Representatives beliefs. However, I am more than happy to take down your opinion and pass it on the a staffer. Can you verify your address/zip first?",
      },
      { from: "Me", me: true, content: "123 Boston Ave, Boston MA, 02120 " },
      {
        from: "CivicConnect",
        content:
          "Thank you!  Your opinion has been noted. The Congressman appreciates you taking the time to leave your feedback.",
      },
    ],
    stuck: [
      {
        from: "CivicConnect",
        content:
          "Hi I am CivicConnect. I am here to answer any questions you may have, but, keep in mind, I am still an AI representative and do not have all of the answers.",
      },
      { from: "Me", me: true, content: "I am stuck in the Maldives, and I lost my passport. What to I do?" },
      {
        from: "CivicConnect",
        content:
          "Hello! First, we have to verify that you are a resident in Boston. Can you please specify your address?",
      },
      { from: "Me", me: true, content: "123 Washington Rd. Boston, MA 02126" },
      {
        from: "CivicConnect",
        content:
          "Okay great! We confirmed your address. Have you filled out the casework request/privacy release form?",
      },
      { from: "Me", me: true, content: "Yes" },
      {
        from: "CivicConnect",
        content: "Thank you! The urgent nature of your request has been noted and a staffer has been flagged",
      },
    ],
    shutdown: [
      {
        from: "CivicConnect",
        content:
          "Hi I am CivicConnect. I am here to answer any questions you may have, but, keep in mind, I am still an AI representative and do not have all of the answers.",
      },
      { from: "Me", me: true, content: "Is the DC office still open for meetings?" },
      {
        from: "CivicConnect",
        content: (
          <>
            <p>
              The Longworth House Office Building will remain open to the public, but please consider planning your
              visit after the shutdown is over or requesting a virtual meeting with our staff.
            </p>
            <p>
              Security wait times will be longer than normal, due to a limited number of open entrances. The Cafeteria
              will also be closed during this time.
            </p>
            <p>
              Please call our office at 202-225-8020 if you have specific questions about scheduling a meeting in
              Washington during this period.
            </p>

            <LinkSource
              title="Federal Shutdown FAQ"
              url="https://moulton.house.gov/news/updates/federal-shutdown-faq"
            />
          </>
        ),
      },
      { from: "Me", me: true, content: "Thank you! How can I setup a meeting?" },
      {
        from: "CivicConnect",
        content: (
          <>
            <p>
              Please complete the linked form to request Congressman Moulton appearance at a a meeting, speaking
              function, or a non-speaking function.
            </p>

            <LinkSource title="Request a Meeting" url="https://moulton.house.gov/contact/request-a-meeting" />
          </>
        ),
      },
      { from: "Me", me: true, content: "Thanks" },
      {
        from: "CivicConnect",
        content: (
          <>
            <p>I hope I was helpful! Feel free to ask other questions.</p>
            <p>If you do not have any more questions, please rate your interaction with me!</p>
            <Rating />
          </>
        ),
      },
    ],
  };

  if (!(params.slug in samples)) {
    return redirect("/");
  }
  const messages = samples[params.slug as keyof typeof samples];

  return (
    <>
      <Chat messages={messages} />
      <div className="fixed bottom-0 bg-white/90 left-0 right-0">
        <div className="space-x py-4">
          <div className="relative">
            <Input className="z-0 text-lg px-5 py-6 pr-12" placeholder="Message CivicConnect ..." />

            <button className="absolute top-[0.55rem] right-[0.55rem] border rounded-sm p-2">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
