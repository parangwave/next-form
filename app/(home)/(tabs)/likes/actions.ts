import db from "@/lib/db";

export async function getInitialMyLikesTweets(userId: number) {
  const tweets = await db.tweet.findMany({
    where: {
      likes: {
        some: {
          userId: userId,
        },
      },
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
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
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
