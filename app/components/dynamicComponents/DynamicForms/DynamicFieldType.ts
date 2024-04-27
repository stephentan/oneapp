export type DynamicFieldType = string[][];
export type DynamicFieldWithHeadersType = [
  {
    headerName: string;
    fields: DynamicFieldType;
  },
];
