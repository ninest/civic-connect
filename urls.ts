export const urls = {
  chat: (botSlug: string) => `/${botSlug}`,
  bot: {
    create: () => `/create`,
    edit: (botSlug: string) => `/${botSlug}/edit`,

    createCategory: (botSlug: string) => `/${botSlug}/edit/category/new`,
    editCategory: (botSlug: string, categoryId: string) => `/${botSlug}/edit/category/${categoryId}`,

    documents: (botSlug: string) => `/${botSlug}/documents`,

    forms: (botSlug: string) => `/${botSlug}/forms`,
    createForm: (botSlug: string) => `/${botSlug}/forms/create`,
    editForm: (botSlug: string, formId: string) => `/${botSlug}/forms/${formId}`,
    formSubmissions: (botSlug: string, formId: string) => `/${botSlug}/forms/${formId}/submissions`,

    conversations: (botSlug: string) => `/${botSlug}/conversations`,

    integrations: (botSlug: string) => `/${botSlug}/integrations`,

    analytics: (botSlug: string) => `/${botSlug}/analytics`,
  },
};
