export type ModelDefinitionFieldType = {
  name: string;
  kind: string;
  isList: boolean;
  isRequired: boolean;
  isUnique: boolean;
  isId: boolean;
  isReadOnly: boolean;
  hasDefaultValue: boolean;
  type: string;
  default: string | number | boolean | null;
  isGenerated: boolean;
  isUpdatedAt: boolean;
  customAttribute: {
    label: string;
    fieldType: string;
    placeholder?: string;
    options?: any[];
    note?: string;
  };
  relationName?: string;
  relationFromFields?: string[];
  relationToFields?: string[];
  relationOnDelete?: string;
};

export type ModelDefinitionType = {
  name: string;
  dbName: string | null;
  fields: Record<
    string,
    ModelDefinitionFieldType
    // {
    //   name: string;
    //   kind: string;
    //   isList: boolean;
    //   isRequired: boolean;
    //   isUnique: boolean;
    //   isId: boolean;
    //   isReadOnly: boolean;
    //   hasDefaultValue: boolean;
    //   type: string;
    //   default: string | number | boolean | null;
    //   isGenerated: boolean;
    //   isUpdatedAt: boolean;
    //   customAttribute: {
    //     label: string;
    //     fieldType: string;
    //   };
    //   relationName?: string;
    //   relationFromFields?: string[];
    //   relationToFields?: string[];
    //   relationOnDelete?: string;
    // }
  >;
  primaryKey: null;
  uniqueFields: string[][];
  uniqueIndexes: {
    name: string | null;
    fields: string[];
  }[];
  isGenerated: boolean;
  customAttribute: {
    label: string;
  };
};
export type ModelDefinitionMapType = Record<string, ModelDefinitionType>;
