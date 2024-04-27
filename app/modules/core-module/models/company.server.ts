import type { Company } from "@prisma/client";

import { prisma } from "~/db.server";
export async function getStore(id: string) {
  return prisma.company.findUnique({
    where: { id },
  });
}

export async function getCompanyById(id: string) {
  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      User: true,
    },
  });

  return company;
}
