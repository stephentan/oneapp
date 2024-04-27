import { prisma } from "~/db.server";
import fs from "fs";
import { uploadToS3 } from "../utils/S3Files.server";
export default function () {
  return {
    name: "DB_MIGRATION_20230603_A_S3_MIGRATION_6",
    execute: async () => {
      const fileUploads = await prisma.fileUpload.findMany();

      for (const fileUpload of fileUploads) {
        const user = await prisma.user.findUnique({
          where: { id: fileUpload.userId },
        });
        let file;
        try {
          file = fs.readFileSync(
            "./public/receipts/" + user?.primaryStoreId + "/" + fileUpload.path,
          );
        } catch (exception) {}
        if (file) {
          await uploadToS3(file, fileUpload.path, user.primaryStoreId);
          await prisma.fileUpload.update({
            where: {
              id: fileUpload.id,
            },
            data: {
              storeId: user?.primaryStoreId,
            },
          });
        } else {
        }
      }
    },
  };
}
