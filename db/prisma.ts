import { PrismaClient, Bot, Document } from "@prisma/client";
import pgvector from "pgvector/utils";

const prisma = new PrismaClient();
export { prisma, pgvector };
export type { Bot, Document };
