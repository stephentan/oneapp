import { prisma } from "~/db.server";
import fs from "fs";
import AWS from "aws-sdk";
import { loadFromS3, uploadToS3 } from "../utils/S3Files.server";
import Jimp from "jimp";
const s3Client = new AWS.S3({
  region: "ap-southeast-1",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});
export default function () {
  return {
    name: "DB_MIGRATION_20230701_A_S3_RESIZE.server",
    execute: async () => {
      const fileUploads = await prisma.fileUpload.findMany();
      for (const fileUpload of fileUploads) {
        try {
          const user = await prisma.user.findUnique({
            where: { id: fileUpload.userId },
          });
          let file;
          if (fileUpload) {
            const params = {
              Bucket: process.env.S3_BUCKET_NAME,
              Key:
                "original" + "/" + fileUpload.storeId + "/" + fileUpload.path,
            };

            const origImage = await s3Client.getObject(params).promise();
            const resizedFileBuffer = await Jimp.read(origImage.Body).then(
              (image) => {
                image.resize(600, Jimp.AUTO).quality(100);
                return image.getBufferAsync(Jimp.AUTO);
              },
            );
            await uploadToS3(
              resizedFileBuffer,
              fileUpload.path,
              fileUpload.storeId,
              "600",
            );
          }
        } catch (exception) {
          console.log("s3 resize upload exception", exception);
        }
      }
    },
  };
}
