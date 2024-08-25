import TweetList from "@/components/TweetList";
import { Prisma } from "@prisma/client";
import { getInitialTweets } from "./actions";

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export const metadata = {
  title: "홈",
};

export default async function HomePage() {
  const initialTweets = await getInitialTweets();
  return (
    <>
      <TweetList initialTweets={initialTweets} />
    </>
  );
}
