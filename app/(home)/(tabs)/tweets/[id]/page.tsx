import { Tweet } from "@prisma/client";
import db from "@/lib/db";
import Link from "next/link";

export default async function Home({ params }: { params: { id: string } }) {
  async function getTweet(id: number): Promise<Tweet | null> {
    "use server";
    return await db.tweet.findUnique({
      where: {
        id,
      },
    });
  }

  const tweet = await getTweet(Number(params.id));

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 ">
      <div className="flex justify-start  w-1/4">
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="pl-4">
            ⬅️ Back
          </Link>
          <h1 className="text-center flex-1">Tweet Detail</h1>
          <div className="pl-4 invisible">⬅️ Back</div>
        </div>
      </div>

      {tweet ? (
        <div className="flex justify-between border w-1/4 p-3">
          <span>{tweet.tweet}</span>
          <span>written by: {tweet.userId}</span>
        </div>
      ) : (
        <div>no tweet found</div>
      )}
    </div>
  );
}
