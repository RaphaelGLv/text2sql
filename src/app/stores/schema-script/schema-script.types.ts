export type SchemaScript = {
    
    name: string;
    script: string;
}

interface SchemaScriptState {
    schemaScripts: SchemaScript[];
}

interface SchemaScriptActions {
    addSchemaScript: ({ name, script }: SchemaScript) => void;
    removeSchemaScript: (name: string) => void;
}

export type SchemaScriptStore = SchemaScriptState & SchemaScriptActions;