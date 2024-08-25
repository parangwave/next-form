"use server";
import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  tweet: z.string().min(3, "Tweet must be at least 3 characters long"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const tweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        userId: session.id!,
      },
    });

    if (tweet) {
      redirect("/");
    } else {
      return {
        fieldErrors: {
          tweet: ["Tweet not created."],
        },
      };
    }
  }
}
