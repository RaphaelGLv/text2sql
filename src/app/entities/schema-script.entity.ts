import { SchemaScriptModel } from "@/app/stores/schema-script/schema-script.types";
import { generateRandomId } from "@/app/utils/generate-random-id";

export type SchemaScriptEntity = {
  id?: string;
  name: string;
  script: string;
};

export class SchemaScriptFactory {
  static create(data: Partial<SchemaScriptEntity> = {}): SchemaScriptEntity {
    return {
      id: data.id,
      name: data.name ?? "Unnamed Schema",
      script: data.script ?? "",
    };
  }

  static from(obj: {
    id?: string;
    name: string;
    script: string;
  }): SchemaScriptEntity {
    return SchemaScriptFactory.create({
      id: obj.id,
      name: obj.name,
      script: obj.script,
    });
  }

  static toModel(entity: SchemaScriptEntity): SchemaScriptModel {
    return {
      id: entity.id ?? generateRandomId(),
      name: entity.name,
      script: entity.script,
    };
  }
}
