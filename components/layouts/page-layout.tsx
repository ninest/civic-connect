import { Spacer } from "@/components/spacer";
import { ReactNode } from "react";

export const PageLayout = ({ top, children }: { top: ReactNode; children: ReactNode }) => {
  return (
    <>
      {top}
      <Spacer className="h-10" />
      {children}
    </>
  );
};
