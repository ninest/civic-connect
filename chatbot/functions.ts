import { Bot, Form, FormWithFields } from "@/types";

export function createFunctions(bot: Bot, forms: FormWithFields[]) {
  const functions = forms.map((form) => {
    const properties: Record<string, { type: string; description: string }> = {};
    form.fields.forEach((field) => {
      properties[field.fieldName] = {
        type: field.valueType,
        description: field.description,
      };
    });
    return {
      name: `${form.name.toLowerCase()}_form`,
      description: `${form.description}\n\n${form.instructions}`,
      parameters: {
        type: "object",
        properties,
      },
    };
  });

  return functions;
}
