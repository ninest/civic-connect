import { ChatOpenAI } from "langchain/chat_models/openai";

export const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4-1106-preview",
});
