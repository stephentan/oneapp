import {
  ActionFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { getModelDefinition } from "~/server/utils/ModelUtils.server";
import { generateImageFileName } from "~/server/utils/S3Files.server";

import {
  DynamicFieldType,
  DynamicFieldWithHeadersType,
} from "./DynamicFieldType";
import { isArray } from "lodash";

export async function DynamicFieldAction(
  { request }: ActionFunctionArgs,
  {
    modelName,
    modelDefinition,
    // formFields,
    onSubmit,
    hiddenFields = [],
  }: {
    modelName: string;
    modelDefinition?: any;
    // formFields: DynamicFieldWithHeadersType | DynamicFieldType;
    onSuccess?: (data: Record<string, string | number>) => void;
    onSubmit: (data: Record<string, string | number>) => Promise<boolean>;
    hiddenFields?: string[];
  },
) {
  const fields: string[] = [];
  // if (formFields[0].headerName === undefined) {
  //   formFields.map((row) => {
  //     row.map((field) => {
  //       fields.push(field);
  //     });
  //   });
  // } else {
  //   formFields.map((fieldsWithHeader) => {
  //     fieldsWithHeader.fields.map((row) => {
  //       row.map((field) => {
  //         fields.push(field);
  //       });
  //     });
  //   });
  // }
  const modelDefinitionObject =
    modelDefinition || getModelDefinition(modelName);
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler(),
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  const data: Record<string, string | number> = {};
  hiddenFields.map((entry) => {
    data[entry] = formData.get(entry) as string;
  });
  const formDataList = [...formData.entries()];
  for (const formDataEntry of formDataList) {
    const key = formDataEntry[0];
    const value = formDataEntry[1];
    const fieldType =
      modelDefinitionObject.fields[key]?.customAttribute?.fieldType;
    if (fieldType === "number") {
      data[key] = parseInt(value as string, 10);
    } else if (fieldType === "money") {
      data[key] = parseInt(value as string, 10);
    } else if (fieldType === "image") {
      data[key] = value;
    } else if (fieldType === "images") {
      const allData = isArray(value) ? value : [value];
      if (isArray(data[key])) {
        allData.map((entry) => {
          data[key].push(entry);
        });
      } else {
        data[key] = allData;
      }
    } else {
      data[key] = value as string;
    }
    // switch (fieldType) {
    //   case "number":
    //     data[key] = parseInt(value as string, 10);
    //     break;
    //   case "money":
    //     data[key] = parseInt(value as string, 10);
    //     break;
    //   case "image":
    //     data[key] = value;
    //     break;
    //   case "images":
    //     const allData = isArray(value) ? value : [value];
    //     data[key] = allData;
    //     break;
    //   default:
    //     data[key] = value as string;
    // }
  }

  const result = onSubmit(data);
  return result;

  // await prisma["testModel"].create({
  //   data,
  // });
}
