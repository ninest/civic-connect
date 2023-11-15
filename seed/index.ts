import { prisma } from "@/db/prisma";
import { vectorStore } from "@/langchain/vectorspaces";
import { documentService } from "@/services/document";
import fs from "fs/promises";

(async () => {
  const moulton = await prisma.bot.create({
    data: { slug: "seth-moulton", name: "Seth Moulton", description: "The chatbot for Congressman Seth Moulton." },
  });

  // const about = await fs.readFile("./seed/data/about.txt", "utf-8");
  // const shutdownFaq = await fs.readFile("./seed/data/federal-shutdown-faq.txt", "utf-8");
  // const israelHamas = await fs.readFile("./seed/data/israel-hamas.txt", "utf-8");
  // const vissionMissionValues = await fs.readFile("./seed/data/vision-mission-values.txt", "utf-8");

  // await documentService.createDocuments(moulton.id, [
  //   { name: "About Seth Moulton", content: about },
  //   { name: "Federal Shutdown FAQ", content: shutdownFaq },
  //   { name: "Israel Shutdown", content: israelHamas },
  //   { name: "Vision, Mission, Values", content: vissionMissionValues },
  // ]);

  // const result = await vectorStore.similaritySearch("Views on war");
  // console.log(result);
})();
