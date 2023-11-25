import { prisma } from "@/db/prisma";

(async () => {
  const moulton = await prisma.bot.create({
    data: {
      slug: "seth-moulton",
      name: "Seth Moulton Bot",
      description: "The chatbot for Congressman Seth Moulton, that can answer questions about Congressman Seth Moulton in Salem, MA, and collect opinions and other information from constituents.",
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
