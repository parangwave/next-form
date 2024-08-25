"use server";

import { z } from "zod";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const searchSchema = z.object({
  search: z.string().min(1, "1글자 이상 입력하세요."),
});

export async function validateSearchKeyword(
  prevState: any,
  formData: FormData
) {
  const data = {
    search: formData.get("search"),
  };

  const result = await searchSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const searchKeyword = encodeURI(result.data.search);
    revalidatePath(`/search/result?search=${searchKeyword}`);
    redirect(`/search/result?search=${searchKeyword}`);
  }
}

export async function getSearchedTweet(search: string) {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: search,
      },
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          likes: true,
          responses: true,
        },
      },
    },
  });
  return tweets;
}
