import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { uploadImage } from "~/server/utils/S3Files.server";
import generateVerificationCode, {
  generateVerificationShortCode,
} from "~/server/utils/generateVerificationId.server";
import { createFile } from "./fileUpload.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}
export async function verifyUser(verificationCode: string) {
  const user = await prisma.user.findFirst({
    where: { verificationCode, isVerified: false },
  });
  if (user) {
    return prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
      },
    });
  }
}
export async function verifyUserWithShortCode(verificationShortCode: string) {
  const user = await prisma.user.findFirst({
    where: { verificationShortCode, isVerified: false },
  });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
      },
    });
    return true;
  }
  return false;
}
export async function getUserEmailById(id: User["id"]) {
  return prisma.user.findUnique({
    select: {
      email: true,
    },
    where: { id },
  });
}
export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({
    select: {
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true,
      firstName: true,
      lastName: true,
      isVerified: true,
    },
    where: { email },
  });
}
export async function signupUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode();
  const verificationShortCode = generateVerificationShortCode();
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      isVerified: false,
      verificationCode,
      verificationShortCode,
    },
  });
}

export async function createUser(
  email: User["email"],
  password: string,
  firstName: string,
  lastName: string,
  storeName: string,
  slug: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode();
  const company = await prisma.company.create({
    data: {
      name: storeName,
      slug: slug,
    },
  });
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      isVerified: false,
      verificationCode,
      primaryCompanyId: company.id,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  console.log("verify login");
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });
  console.log("user", userWithPassword);
  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }
  console.log("password:", password, userWithPassword.password.hash);
  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
