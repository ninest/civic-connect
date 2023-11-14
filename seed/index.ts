import { prisma, pgvector } from "@/db/prisma";
import { getQueryEmbedding } from "@/langchain/embeddings";
import { createDocuments, vectorStore } from "@/langchain/vectorspaces";
import fs from "fs/promises";
import { VectorStore } from "langchain/vectorstores/base";

(async () => {
  const moulton = await prisma.bot.create({
    data: { name: "Seth Moulton", description: "The chatbot for Congressman Seth Moulton." },
  });

  const about = await fs.readFile("./seed/data/about.txt", "utf-8");
  const shutdownFaq = await fs.readFile("./seed/data/federal-shutdown-faq.txt", "utf-8");
  const israelHamas = await fs.readFile("./seed/data/israel-hamas.txt", "utf-8");
  const vissionMissionValues = await fs.readFile("./seed/data/vision-mission-values.txt", "utf-8");

  await createDocuments(moulton.id, [
    { name: "About Seth Moulton", description: "", content: about },
    { name: "Federal Shutdown FAQ", description: "", content: shutdownFaq },
    { name: "Israel Shutdown", description: "", content: israelHamas },
    { name: "Vision, Mission, Values", description: "", content: vissionMissionValues },
  ]);

  const result = await vectorStore.similaritySearch("Views on war");
  console.log(result);
})();
