import { Metadata } from "next";
import { ChatClient } from "./chat-client";
import { BaseScreen } from "@/app/components/layout/base-screen/base-screen";

export const metadata: Metadata = {
  title: "Chat | Text2SQL"
}

export default function Page() {
  return (
    <BaseScreen>
      <ChatClient />
    </BaseScreen>
  );
}
