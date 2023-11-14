
# Civic Connect

## Development

This projects requires

- Node v18+ 
- [pnpm](https://pnpm.io/): Please follow the [pnpm installation guide](https://pnpm.io/installation) to install it
- Docker

After cloning the repository, run

```
pnpm i 
```

To setup the local database and add seed data, run

```
pnpm db:reset  # warning: this will delete all data in the local database
```

This commands runs

- `pnpm db:down`: deletes the database
- `pnpm db:up`: sets up the database
- `pnpm db:seed`: runs the seed script to populate the database with sample data

To start the development server, run

```
pnpm dev
```

### Libraries

- [Nextjs](https://nextjs.org/docs): make sure you are looking at the docs for the "App Router"
- [LangChain](https://www.langchain.com/): we're using the JS library
  - [LangChain Prisma integration](https://js.langchain.com/docs/integrations/vectorstores/prisma)
- [Prisma](https://www.prisma.io/): see `prisma/schema.prisma` for the Postgres DB schema
- [TailwindCSS](https://tailwindcss.com/)
- [ShadcnUI](https://ui.shadcn.com/): this UI library takes care of a lot of the difficult stuff for us, like complex components (dropdowns, autocomplete, etc) and accessibility