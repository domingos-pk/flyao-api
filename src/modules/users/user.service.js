import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";

export async function createUser({ name, email, phone, password }) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("Email já está em uso.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, phone, password: hashedPassword },
    select: { id: true, name: true, email: true, phone: true, createdAt: true },
  });

  return user;
}