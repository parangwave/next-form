import Link from "next/link";
import { Tweet } from "@prisma/client";
import getSession from "@/lib/session";
import db from "@/lib/db";
import AddTweet from "@/app/components/AddTweet";

export default async function Home() {
  const pageSize = 3;
  const page = 1;

  async function getTweets(page: number): Promise<Tweet[]> {
    "use server";
    const session = await getSession();
    const skip = (page - 1) * pageSize;
    return await db.tweet.findMany({
      where: {
        userId: session.id,
      },
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: pageSize,
    });
  }

  const tweets = await getTweets(page);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 ">
      <div className="flex justify-start  w-1/4">
        <div className="flex justify-between items-center w-full">
          <AddTweet />
          <h1 className="self-center">Tweets</h1>
        </div>
      </div>
      {tweets?.map((item, idx) => (
        <Link
          key={idx}
          href={`/tweets/${item.id}`}
          className="flex justify-between border w-1/4 p-3"
        >
          <span>{item.tweet}</span>
          <span>written by: {item.userId}</span>
        </Link>
      ))}

      {tweets.length === 0 && <div>no tweet found</div>}
    </div>
  );
}
