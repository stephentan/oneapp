import fs from "fs";

import AWS from "aws-sdk";
import Jimp from "jimp";

import { getImage } from "~/modules/core-module/models/fileUpload.server";

import generateId from "./uniqueId.server";

const s3Client = new AWS.S3({
  region: "ap-southeast-1",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});

export const generateImageFileName = (image: FormDataEntryValue) => {
  const newFileName =
    generateId() + image?.name?.substring(image?.name?.lastIndexOf("."));
  return newFileName;
};
export const uploadImage = async (
  image: FormDataEntryValue,
  storeId: string,
  isPublic = false,
  fileName: string | undefined,
) => {
  const newFileName =
    fileName ||
    generateId() + image?.name?.substring(image?.name?.lastIndexOf("."));
  const _readStream = fs.createReadStream(image.filepath);
  const result = await uploadToS3(
    _readStream,
    newFileName,
    storeId,
    "original",
    isPublic,
  );
  const resizedFileBuffer = await Jimp.read(image.filepath).then((image) => {
    image.resize(600, Jimp.AUTO).quality(100);
    return image.getBufferAsync(Jimp.AUTO);
  });
  const resultResize = await uploadToS3(
    resizedFileBuffer,
    newFileName,
    storeId,
    "600",
    isPublic,
  );

  return newFileName;
};

export const uploadToS3 = (
  fileContent,
  fileName: string,
  filePath: string,
  size = "original",
  isPublic: boolean,
) => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME || "", // pass your bucket name
    Key: size + "/" + filePath + "/" + fileName, // file will be saved as testBucket/contacts.csv
    Body: fileContent,
  };
  if (isPublic) {
    params.ACL = "public-read";
  }
  return s3Client
    .upload(params, (s3Err, data) => {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
    })
    .promise();
};

export const loadFromS3 = async (fileUploadId: string, size = 0) => {
  const fileObject = await getImage({ id: fileUploadId });

  if (fileObject) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key:
        (size === 0 ? "original" : size) +
        "/" +
        fileObject.storeId +
        "/" +
        fileObject.path,
    };

    return s3Client.getObject(params).createReadStream();
  }
};
