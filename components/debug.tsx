import clsx from "clsx";
import { ComponentProps } from "react";

interface DebugProps extends ComponentProps<"div"> {
  data: any;
  showInProd?: boolean;
}

export const Debug = ({ data, showInProd = false, className }: DebugProps) => {
  const isDev = process.env.NODE_ENV === "development" || window.location.href.includes("debug");
  const show = isDev || showInProd;
  return (
    <>
      {show && (
        <pre
          className={clsx(className, "bg-[#112] p-3 text-gray-300 text-xs rounded-lg", "overflow-scroll max-w-full")}
          suppressHydrationWarning
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </>
  );
};
