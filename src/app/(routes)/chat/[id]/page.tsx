import { ChatClient } from "./chat-client";
import { BaseScreen } from "@/app/components/layout/base-screen/base-screen";

export default function Page() {
  return (
    <BaseScreen>
      <ChatClient />
    </BaseScreen>
  );
}
