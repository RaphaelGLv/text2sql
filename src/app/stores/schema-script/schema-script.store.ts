import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SchemaScriptStore } from "./schema-script.types";
import { idbStorage } from "@/app/lib/idb-storage";

export const useSchemaScriptStore = create<SchemaScriptStore>()(
  persist(
    (set) => ({
      schemaScripts: [],
      addSchemaScript: ({ name: schemaName, script: schemaScript }) =>
        set((state) => {
          const existingIndex = state.schemaScripts.findIndex(
            (script) => script.name === schemaName
          );

          if (existingIndex !== -1) {
            throw new Error("Você já possui um esquema com esse nome.");
          }

          state.schemaScripts.push({ name: schemaName, script: schemaScript });

          return { schemaScripts: state.schemaScripts };
        }),
      removeSchemaScript: (schemaName) =>
        set((state) => {
          state.schemaScripts = state.schemaScripts.filter(
            (script) => script.name !== schemaName
          );
          return { schemaScripts: state.schemaScripts };
        }),
    }),
    {
      name: "schema-script-storage",
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
