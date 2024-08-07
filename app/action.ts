"use server";

import { z } from "zod";

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
  USERNAME_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

const schema = z.object({
  email: z.string().email().regex(EMAIL_REGEX, EMAIL_REGEX_ERROR),
  username: z.string().min(USERNAME_MIN_LENGTH, USERNAME_MIN_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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
