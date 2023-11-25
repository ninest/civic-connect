import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { z } from "zod";

const routerParser = StructuredOutputParser.fromZodSchema(
  z.object({
    type: z.union([z.literal("knowledge-based"), z.literal("form-based")]),
    reason: z.string(),
  })
);

const routerChain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    "Identify what kind of question this is and provide a reason. It can be form-based if there is a function matching the description of what the user wants to do, or it can be knowledge based if you may have context that can help answer the question.\n{format_instructions}\n{question}"
  ),
  new OpenAI({ temperature: 0 }),
  routerParser,
]);
