import { Document, prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PrismaVectorStore } from "langchain/vectorstores/prisma";

export const vectorStore = PrismaVectorStore.withModel<Document>(prisma).create(new OpenAIEmbeddings(), {
  prisma: Prisma,
  tableName: "Document",
  vectorColumnName: "embedding",
  columns: {
    id: PrismaVectorStore.IdColumn,
    content: PrismaVectorStore.ContentColumn,
  },
});

export const createDocuments = async (
  botId: string,
  docs: { name: string; description: string; content: string }[]
) => {
  await vectorStore.addModels(
    await prisma.$transaction(
      docs.map(({ name, description, content }) =>
        prisma.document.create({
          data: {
            botId,
            name,
            description,
            content,
          },
        })
      )
    )
  );
};
