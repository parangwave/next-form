"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

/* 사용자 */
export async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (!user) {
      return;
    }

    return user;
  }
}

export async function logOut() {
  const session = await getSession();

  if (session) {
    session.destroy();
  }

  return redirect("/auth");
}

/* 사용자별 트윗 */
export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          username: true,
          email: true,
        },
      },
      likes: {
        select: {
          user: true,
        },
      },
    },
  });

  return tweet;
}

/* 트윗별 댓글 */
export async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId: tweetId,
    },
    select: {
      id: true,
      response: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      tweet: {
        select: {
          userId: true,
          id: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return responses;
}
