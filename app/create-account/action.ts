"use server";
import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .refine(checkUniqueUsername, "Username is already taken."),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(/\d/, "Password must include at least one digit."),
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      checkUniqueEmail,
      "There is an account already registered with that email."
    ),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    redirect("/log-in");
  }
}
