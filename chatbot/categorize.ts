import { Category, Message } from "@/types";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { z } from "zod";

// export const categoryParser = StructuredOutputParser.fromZodSchema(z.array(z.string()));
export const categoryParser = StructuredOutputParser.fromZodSchema(
  z.array(z.object({ id: z.string(), name: z.string(), description: z.string() }))
);

export const categoryChain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    "Identify the categories of this conversation. If no category is found, it can be general. Return the category IDs\n{format_instructions}\n{question}"
  ),
  new OpenAI({ temperature: 0 }),
  categoryParser,
]);

export async function getConversationCategory(conversation: Message[], categories: Category[]): Promise<string[]> {
  // Categories with only relevant details
  const refinedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
  }));
  const question = `What are the categories of this conversation? There may be multiple. The available categories and their IDs and descriptions are listed:

${JSON.stringify(refinedCategories)}

The conversation is:

${JSON.stringify(conversation)}`;

  const response = await categoryChain.invoke({
    question,
    format_instructions: categoryParser.getFormatInstructions(),
  });


  return response.map((res) => res.id);
}
