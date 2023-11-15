import { prisma } from "@/db/prisma";
import { vectorStore } from "@/langchain/vectorspaces";
import { DocumentType } from "./schemas";
import { prismaTransformer } from "@/transformers/prisma";

export const documentService = {
  async createDocuments(botId: string, documents: DocumentType[]) {
    await vectorStore.addModels(
      await prisma.$transaction(
        documents.map((doc) =>
          prisma.document.create({
            data: { botId, name: doc.name, content: doc.content },
          })
        )
      )
    );
  },
  async deleteAllDocuments(botId: string) {
    const documents = await prisma.document.deleteMany({ where: { botId } });
  },
  async getAllDocuments(botId: string) {
    const documents = await prisma.document.findMany({ where: { botId } });
    return documents.map(prismaTransformer.document);
  },
};
