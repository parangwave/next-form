"use server";

import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .email()
    .regex(/@zod\.com$/, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username should be at least 5 characters long"),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long")
    .regex(/\d/, "Password should contain at least one number (0123456789)"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    schema.parse({ email, username, password });

    return {
      success: true,
      errors: [],
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        success: false,
        errors: e.errors.map((error) => error.message),
      };
    }
    return {
      success: false,
      errors: ["An unknown error occurred"],
    };
  }
}
