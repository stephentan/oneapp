import { prisma } from "~/db.server";
export default function () {
  return {
    name: "DB_MIGRATION_20230619_A_UPDATESEARCHFIELDPRODUCT.server_3",
    execute: async () => {
      const products = await prisma.product.findMany();
      for (const product of products) {
        await prisma.product.update({
          where: {
            id: product.id,
          },
          data: {
            searchField: product.name.toLowerCase(),
          },
        });
      }
    },
  };
}
