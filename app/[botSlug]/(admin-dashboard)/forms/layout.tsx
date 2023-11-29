import { ComponentProps } from "react";

interface Params {
  botSlug: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  return {
    title: "Forms",
  };
}

export default function FormLayout({ children }: ComponentProps<"div">) {
  return children;
}
