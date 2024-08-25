import { getUser } from "@/app/(auth)/actions";
import { Prisma } from "@prisma/client";
import { getInitialMyLikesTweets } from "./actions";
import MyLikesTweetList from "@/components/TweetList";
import NotFoundPage from "@/app/not-found";

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialMyLikesTweets
>;

export const metadata = {
  title: "",
};

export default async function MyLikesTweetsPage() {
  const user = await getUser();
  if (!user) {
    return NotFoundPage;
  }

  const initialTweets = await getInitialMyLikesTweets(user.id);

  return (
    <>
      <MyLikesTweetList initialTweets={initialTweets} />
    </>
  );
}
