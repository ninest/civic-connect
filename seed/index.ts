import { prisma } from "@/db/prisma";

(async () => {
  const moulton = await prisma.bot.create({
    data: {
      slug: "seth-moulton",
      name: "Seth Moulton Bot",
      description: "The chatbot for Congressman Seth Moulton.",
      categories: {
        create: [
          {
            name: "Housing",
            description: "Everything related to housing and homelessness.",
          },
          {
            name: "Healthcare",
            description: "Everything related to healthcare and health insurance",
          },
        ],
      },
    },
  });
})();
