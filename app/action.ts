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
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (password === "12345") {
    return {
      success: true,
      errors: [],
    };
  } else {
    return {
      success: false,
      errors: ["Wrong password"],
    };
  }
}
