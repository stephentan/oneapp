import {
  ModelDefinitionType,
  ModelDefinitionMapType,
} from "~/lib/types/ModelDefinitionType";

import ModelStructure from "../ModelDefinitions.server";

export type ModelType = {
  field: string;
  message: string;
};

export function getModelDefinition(modelName: string): ModelDefinitionType {
  const ModelDefinitionMap =
    ModelStructure as unknown as ModelDefinitionMapType;
  return ModelDefinitionMap[modelName] as ModelDefinitionType;
}
