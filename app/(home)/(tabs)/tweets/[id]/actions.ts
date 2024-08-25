"use server";

import { getTweet, getUser } from "@/app/(auth)/actions";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

/* 댓글 */
const responseSchema = z.object({
  response_add: z.string().max(100, "100자 이내로 작성해주세요."),
});

export async function addResponse(id: number, formData: FormData) {
  try {
    const user = await getUser();
    const tweet = await getTweet(id);
    const response_add = formData.get("response_add");

    if (typeof response_add !== "string") {
      return { error: "Invalid comment content" };
    }

    const result = responseSchema.safeParse({ response_add });

    if (!result.success) {
      return { error: result.error.errors[0].message };
    }

    if (!user) {
      return { error: "User not found" };
    }

    if (!tweet) {
      return { error: "Tweet not found" };
    }

    await db.response.create({
      data: {
        response: result.data.response_add,
        userId: user.id,
        tweetId: tweet.id,
      },
    });

    revalidatePath(`/tweets/${id}`);
  } catch (e) {}
}

export async function deleteResponse(id: number) {
  try {
    await db.response.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/tweets/${id}`);

    return { success: true };
  } catch (error) {
    return { error: "댓글 삭제에 실패했습니다." };
  }
}

/* 좋아요 */
export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}

export async function unLikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-like-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}

/* 저장 */
export async function saveTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`save-status-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}

export async function unSaveTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`save-status-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}
