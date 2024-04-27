import { prisma } from "~/db.server";
import fs from "fs";
import { uploadToS3 } from "../utils/S3Files.server";
import { getSlug } from "../utils/slug.server";
export default function () {
  return {
    name: "DB_MIGRATION_20230605_A_SLUGIFYPRODUCTSCOLLECTION.server_1",
    execute: async () => {
      const products = await prisma.product.findMany();
      for (const product of products) {
        await prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            slug: getSlug(product.name),
          },
        });
      }

      const collections = await prisma.collection.findMany();
      for (const collection of collections) {
        await prisma.collection.update({
          where: {
            id: collection.id,
          },
          data: {
            slug: getSlug(collection.name),
          },
        });
      }
    },
  };
}
