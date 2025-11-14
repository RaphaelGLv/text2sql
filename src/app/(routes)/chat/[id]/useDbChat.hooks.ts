import { turnTextToSqlAction } from "@/actions/turn-text-to-sql/turn-text-to-sql.action";
import { useSchemaScriptStore } from "@/app/stores/schema-script/schema-script.store";
import { SchemaScriptModel } from "@/app/stores/schema-script/schema-script.types";
import { useToastStore } from "@/app/stores/toast/toast.store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UseDbChatHooks {
  schema?: SchemaScriptModel;
  chatInput: string;
  setChatInput: (value: string) => void;
  handleSendPrompt: () => void;
}

export function useDbChatHooks(): UseDbChatHooks {
  const setToast = useToastStore((state) => state.setToast);

  const [chatInput, setChatInput] = useState("");

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const schema = useSchemaScriptStore((state) =>
    state.schemaScripts.find(
      (schema) => schema.id === decodeURIComponent(params.id)
    )
  );

  useEffect(() => {
    if (!schema) {
      router.replace("/");
    }
  }, [schema, router]);

  async function handleSendPrompt() {
    try {
      const response = await turnTextToSqlAction({
        question: chatInput,
        sqlSchemaScript: schema?.script || "",
      });

      if (!response.success) {
        setToast({
          message: response.message,
          type: "error",
        });
        return;
      }

      console.log(response.data);

      setToast({
        message: response.message,
        type: "success",
      });
    } catch (error) {
      const typedError = error as Error;
      setToast({
        message: typedError.message || "Erro ao enviar o prompt.",
        type: "error",
      });
    }
  }

  return {
    schema,
    chatInput,
    setChatInput,
    handleSendPrompt,
  };
}
