import { prisma } from "@/db/prisma";

(async () => {
  const moulton = await prisma.bot.create({
    data: { slug: "seth-moulton", name: "Seth Moulton Bot", description: "The chatbot for Congressman Seth Moulton." },
  });
})();
