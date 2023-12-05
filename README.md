# Civic Connect

> A platform to create chatbots for constituent engagement 

## Features

- 📄 **Documents**: upload documents to give GPT more context
- 🖊️ **Forms**: collect user data seamlessly through natural, conversational forms
- 💬 **Slack integration**: get notified when forms are submitted
- 📊 **Analytics**: access insights on chatbot usage and user engagement

### User chat
<p align="center">
  <img src="./assets/2023-12/chat-example-1.png" width="40%" />
  &nbsp;
  <img src="./assets/2023-12/chat-example-2.png" width="40%" />
</p>

### Admin dashboard

![Admin dashboard](./assets/2023-12/edit-bot.png)

<details>
<summary>View more images (documents uploading, forms, analytics, chatbot demo)</summary>

Uploading documents to provide context and knowledge in answering questions:

![uploading documents](./assets/2023-12/documents.png)

Forms for collecting information from users:

![forms](./assets/2023-12/forms.png)

Form submissions page:

![form submissions](./assets/2023-12/form-submissions.png)

Chatbot demo for admins to test form submissions and other features:

![chatbot demo](./assets/2023-12/admin-chat-demo.png)

Conversations table:

![conversations view](./assets/2023-12/conversations.png)

Analytics page showing total number of conversations and breakdown by conversation category:

![analytics view](./assets/2023-12/analytics.png)

Integrations page:

![integrations](./assets/2023-12/integrations.png)

</details>

[View videos](#Videos)

## Development

This projects requires

- Node v18+ 
- [pnpm](https://pnpm.io/): Please follow the [pnpm installation guide](https://pnpm.io/installation) to install it
- Docker

After cloning the repository, run

```
pnpm i 
```

Create a `.env` file with the following:

```env
DATABASE_URL=postgres://user:password@localhost:2430/civicconnect_db
OPENAI_API_KEY=
```

The database URL `postgres://user:password@localhost:2430/civicconnect_db` is the local development database created in a Docker volume.

Create an OpenAI API key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

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

### Contact

If you have any questions about the project, please contact Parth Kabra (parth.kabra@gmail.com).

## Videos

The videos are for a chatbot "Moulton Bot" created for [Congressman Seth Moulton's office](https://moulton.house.gov/).

### User chat

https://github.com/ninest/civic-connect/assets/34677361/53578f39-8422-4e84-ae24-0dd6062f8b48

### Bot editing

https://github.com/ninest/civic-connect/assets/34677361/097c02ed-b200-4924-9d6c-1c9804dbfbc5

### Uploading documents

https://github.com/ninest/civic-connect/assets/34677361/7da5484e-4499-4536-84de-3cf0045b126e

### Form editing

https://github.com/ninest/civic-connect/assets/34677361/333c8773-5ef0-45c5-9e94-044b149f985e

### Form submissions

https://github.com/ninest/civic-connect/assets/34677361/3780371b-a39a-4ad9-8618-2ce66f450629

### Analytics

https://github.com/ninest/civic-connect/assets/34677361/27e3bf49-cffe-4088-8bed-e7dde1d6666a

## Other

- [Project pitch deck](https://www.canva.com/design/DAF0BkKEiFg/nFoOQEfieefQ8_63sd_t6w/edit?utm_content=DAF0BkKEiFg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Slack group](https://join.slack.com/t/congressai4impact/shared_invite/zt-2882nx1ba-DYy_rxYa8_v3GXlkEiUNgw)
- [Project plan document](https://docs.google.com/document/d/1typXe2OvmMHH_WBoVODv8UXTgLfBNDYXhAbyv6pAQwo/edit#heading=h.uioatehl6iil)

### Credits

Group members:

- Ala’a Tamam
- Isha Chadalavada
- Rohit Kaushik
- Parth Kabra
- Arjun Bhat 

Under the advisement of Prof. Beth Noveck, Prof. Dan Jackson, Marci Harris and the PopVox foundation.