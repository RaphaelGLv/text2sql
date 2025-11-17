import { SchemaScriptEntity } from "@/app/entities/schema-script.entity";

export type SchemaScriptModel = {
    id: string;
    name: string;
    script: string;
};

interface SchemaScriptState {
    schemaScripts: SchemaScriptModel[];
}

interface SchemaScriptActions {
    addSchemaScript: (payload: SchemaScriptEntity) => void;
    removeSchemaScript: (id: string) => void;
}

export type SchemaScriptStore = SchemaScriptState & SchemaScriptActions;