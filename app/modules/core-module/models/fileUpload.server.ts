import { prisma } from "~/db.server";
import type { FileUpload, User } from "@prisma/client";

export function getImage({ id }: Pick<FileUpload, "id">) {
  return prisma.fileUpload.findFirst({
    where: {
      id,
    },
  });
}
export function createFile({
  path,
  originalFileName,
  userId,
  companyId,
}: Pick<FileUpload, "path" | "originalFileName"> & { userId: User["id"] } & {
  storeId: string;
}) {
  return prisma.fileUpload.create({
    data: {
      path,
      originalFileName,
      userId,
      companyId,
    },
  });
}
