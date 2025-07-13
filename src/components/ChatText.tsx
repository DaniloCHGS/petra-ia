import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  type?: "user" | "bot";
}

export function ChatText({ children, type = "bot" }: Props) {
  return (
    <div
      className={`px-4 py-2 rounded-lg shadow ${
        type === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 text-gray-900"
      } relative group`}
    >
      {children}
    </div>
  );
}
