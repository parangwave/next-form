"use server";

import { z } from "zod";
import db from "@/lib/db";
import fs from "fs/promises";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { validateUserEmail, validateUserName } from "@/lib/validate";

export const userSchema = z
  .object({
    avatar: z.string(),
    username: z
      .string({
        required_error: "닉네임을 입력해주세요.",
      })
      .min(2, "2글자 이상 입력하세요.")
      .toLowerCase()
      .transform((value) => value.replaceAll(" ", "")),
    email: z
      .string()
      .email("이메일 형식으로 입력하세요.")
      .toLowerCase()
      .optional(),
    password: z
      .string({
        required_error: "비밀번호를 입력해주세요.",
      })
      .min(5, "5글자 이상 입력하세요."),
    new_password: z.string().min(5, "5글자 이상 입력하세요.").optional(),
    confirm_password: z.string().optional(),
    bio: z.string().optional(),
  })
  .superRefine(async ({ username }, ctx) => {
    const validatedUsername = await validateUserName(username);
    if (!validatedUsername) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const validatedEmail = await validateUserEmail(email ? email : "");
    if (!validatedEmail) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이메일 입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

const checknew_password = (new_password: string, confirm_password: string) =>
  new_password === confirm_password;

export async function updateUserProfile(formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    avatar: formData.get("avatar"),
    password: formData.get("password"),
    new_password: formData.get("new_password"),
    confirm_password: formData.get("confirm_password"),
  };

  if (data.avatar instanceof File) {
    const avatarData = await data.avatar.arrayBuffer();
    await fs.appendFile(
      `./public/images/${data.avatar.name}`,
      Buffer.from(avatarData)
    );
    data.avatar = `/images/${data.avatar.name}`;
  }

  const result = await userSchema.safeParseAsync(data);

  if (result.data?.confirm_password && result.data.new_password) {
    const isnew_passwordConfirmed = checknew_password(
      result.data?.new_password,
      result.data?.confirm_password
    );
    if (!isnew_passwordConfirmed)
      return {
        fieldErrors: { confirmPassword: ["새로운 비밀번호를 확인해주세요."] },
      };
  }

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const prevUserInfo = await db.user.findUnique({
        where: {
          id: session.id,
        },
        select: {
          id: true,
          password: true,
        },
      });

      const isValidPassword = await bcrypt.compare(
        result.data.password,
        prevUserInfo!.password ?? "xxxx"
      );
      if (!isValidPassword) {
        return { fieldErrors: { password: ["비밀번호를 확인해주세요."] } };
      }
      console.log("bcrypt result is", isValidPassword);

      if (result.data && result.data.new_password) {
        const newHashedPassword = await bcrypt.hash(
          result.data?.new_password,
          12
        );

        await db.user.update({
          where: {
            id: session.id,
          },
          data: {
            email: result.data.email,
            username: result.data.username,
            password: newHashedPassword,
            bio: result.data.bio,
            avatar: result.data.avatar,
          },
        });
        revalidatePath(`/users/${data.username}`);
        return redirect(`/users/${data.username}`);
      }

      await db.user.update({
        where: {
          id: session.id,
        },
        data: {
          email: result.data.email,
          username: result.data.username,
          bio: result.data.bio,
          avatar: result.data.avatar,
        },
      });
      revalidatePath(`/users/${data.username}`);
      return redirect(`/users/${data.username}`);
    }
  }
}
