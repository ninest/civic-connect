"use server";

import { botService } from "@/services/bot";
import { categoryService } from "@/services/category";
import { formService } from "@/services/form";
import fs from "fs/promises";

(async () => {
  const sethMoultonBot = await botService.create({
    name: "Moulton Bot",
    description: `The chatbot for Congressman Seth Moulton, that can answer questions about Congressman Seth Moulton in Salem, MA, and collect opinions and other information from constituents.

The documents contain:
- Information on Seth Moulton and his congressional office
- Press releases and news related to Seth Moulton`,
  });
  await botService.edit(sethMoultonBot.id, {
    ...sethMoultonBot,
    conversationStarters: [
      { text: "I would like to share a legislative opinion" },
      { text: "I would like to know Seth Moulton's opinions on a specific topic" },
    ],
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "General",
    description: "Any conversation that does not belong in the other categories.",
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "Housing",
    description: "Everything related to housing and homelessness.",
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "Healthcare",
    description: "Everything related to healthcare and health insurance",
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "Gun control",
    description: "Everything related to guns and gun control",
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "Animal welfare",
    description: "Everything related to animals and welfare",
  });
  await categoryService.add(sethMoultonBot.id, {
    name: "Israel Palestine",
    description: "Everything related to the Israel Palestine conflict",
  });

  const opinionsForm = await formService.create(sethMoultonBot.id, {
    name: "Legislative Opinions",
    description: "A form to collect legislative opinions from users",
    instructions: "Collect a user's opinions. The opinions must be legislative. Non-legislative opinions should be accepted.",
  });
  await formService.editFields(opinionsForm.id, {
    fields: [
      {
        fieldName: "Name",
        valueType: "string",
        description: "The user's name",
      },
      {
        fieldName: "Zip code",
        valueType: "string",
        description: "The user's USA zip code",
      },
      {
        fieldName: "Legislative opinion",
        valueType: "string",
        description: "The user's actual legislative opinion",
      },
    ],
  });

  // Documents
  const about = await fs.readFile("./seed/data/about.txt", "utf-8");
  const federalShutdownFaq = await fs.readFile("./seed/data/federal-shutdown-faq.txt", "utf-8");
  const israelHamas = await fs.readFile("./seed/data/israel-hamas.txt", "utf-8");
  const passportAssistance = await fs.readFile("./seed/data/passport-assistance.txt", "utf-8");
  const values = await fs.readFile("./seed/data/vision-mission-values.txt", "utf-8");

  await botService.editDocuments(sethMoultonBot.id, {
    documents: [
      { name: "about.txt", content: about },
      { name: "federal.txt", content: federalShutdownFaq },
      { name: "israel-hamas.txt", content: israelHamas },
      { name: "passport-assistance.txt", content: passportAssistance },
      { name: "vision-mission-valies.txt", content: values },
    ],
  });
})();
