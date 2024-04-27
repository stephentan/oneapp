import fs from "fs";
import generatorHelper from "@prisma/generator-helper";
import prismaInternals from "@prisma/internals";

const { generatorHandler } = generatorHelper;
const { getDMMF } = prismaInternals;
generatorHandler({
  onManifest: () => ({
    prettyName: "My Generator",
  }),
  onGenerate: async (options) => {
    const prismaClientDmmf = await getDMMF({
      datamodel: options.datamodel,
    });
    const models = prismaClientDmmf.datamodel.models;
    const testModel = models.find((model) => model.name === "TestModel");

    const outputMap = {};

    try {
      models.map((model) => {
        const fields = {};
        model.fields.map((field) => {
          const outputField = {
            ...field,
            customAttribute: field.documentation
              ? JSON.parse(field.documentation)
              : {},
          };
          fields[field.name] = outputField;
        });
        const outputModel = {
          ...model,
          fields,
          customAttribute: model.documentation
            ? JSON.parse(model.documentation)
            : {},
        };

        outputMap[model.name] = outputModel;
      });
      fs.writeFile(
        "./app/server/ModelDefinitions.server.ts",
        "export default " + JSON.stringify(outputMap, null, 2),
        "utf8",
        () => {},
      );
    } catch (exception) {
      console.log("exception:", exception);
    }
  },
});
