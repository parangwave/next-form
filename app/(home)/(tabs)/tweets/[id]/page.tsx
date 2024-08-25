import { notFound } from "next/navigation";
import { getTweetDetails } from "../../../(main)/actions";
import { getResponses, getUser } from "@/app/(auth)/actions";
import Tweet from "@/components/Tweet";
import ResponseList from "@/components/ResponseList";
import AddResponse from "@/components/AddResponse";
import { formatToMaxLength } from "@/lib/utils";

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweetDetails(id);
  if (!tweet) {
    return notFound();
  }

  const user = await getUser();
  if (!user) {
    return notFound();
  }

  const responses = await getResponses(tweet.id);
  if (!responses) {
    return notFound();
  }

  return (
    <>
      <div className="detail-inner">
        <Tweet
          id={tweet.id}
          tweet={formatToMaxLength(tweet.tweet, 170)}
          user={tweet.user}
          created_at={tweet.created_at}
          _count={{
            likes: tweet._count.likes,
            responses: tweet._count.responses,
          }}
        />
        <ResponseList id={id} userId={user.id} responses={responses} />
      </div>

      <AddResponse id={id} />
    </>
  );
}
