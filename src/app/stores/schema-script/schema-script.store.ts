import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SchemaScriptStore } from "./schema-script.types";
import { idbStorage } from "@/app/lib/idb-storage";
import {
  SchemaScriptEntity,
  SchemaScriptFactory,
} from "@/app/entities/schema-script.entity";
import { useDbChatMessagesStore } from "@/app/stores/db-chat-messages/db-chat-messages.store";

export const useSchemaScriptStore = create<SchemaScriptStore>()(
  persist(
    (set) => ({
      schemaScripts: [],

      addSchemaScript: (payload: SchemaScriptEntity) =>
        set((state) => {
          const {
            id: maybeId,
            name: schemaName,
            script: schemaScript,
          } = payload;

          const existingIndex = state.schemaScripts.findIndex(
            (s) => s.name === schemaName
          );

          if (existingIndex !== -1) {
            throw new Error("Você já possui um esquema com esse nome.");
          }

          const model = SchemaScriptFactory.toModel({
            id: maybeId,
            name: schemaName,
            script: schemaScript,
          });

          state.schemaScripts.push(model);

          return { schemaScripts: state.schemaScripts };
        }),
      removeSchemaScript: (id: string) => {
        useDbChatMessagesStore.getState().removeByChatId(id);

        set((state) => {
          state.schemaScripts = state.schemaScripts.filter((s) => s.id !== id);
          return { schemaScripts: state.schemaScripts };
        });
      },
    }),
    {
      name: "schema-script-storage",
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
