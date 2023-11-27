import { Bot, FormWithFields } from "@/types";

export function createFunctions(bot: Bot, forms: FormWithFields[]) {
  const functions = forms.map((form) => {
    const properties: Record<string, { type: string; description: string }> = {};
    form.fields.forEach((field) => {
      properties[field.fieldName] = {
        type: field.valueType,
        description: `${field.description}. This value may not be unknown`,
      };
    });
    return {
      name: `${form.name}_form`,
      description: `${form.description}\n\n${form.instructions}`,
      parameters: {
        type: "object",
        properties,
        required: form.fields.map((field) => field.fieldName),
      },
    };
  });

  return functions;
}
