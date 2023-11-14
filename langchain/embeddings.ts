import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });

export const getQueryEmbedding = async (text: string) => {
  return await embeddings.embedQuery(text);
};
