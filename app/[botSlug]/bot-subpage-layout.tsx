import { ReactNode } from "react";

export const BotSubPageLayout = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <>
      <header className="h-[4rem] flex px-5 items-center border-b">
        <h1>{title}</h1>
      </header>
      <div className="space-x py-8">{children}</div>
    </>
  );
};
