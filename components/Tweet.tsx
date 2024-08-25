import { formatToDateTime } from "@/lib/utils";
import { TweetProps } from "@/lib/types";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import LikeButton from "./LikeButton";

export default function TweetItem({
  tweet,
  id,
  user,
  created_at,
  _count: { likes, responses },
}: TweetProps) {
  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <Avatar
          width={32}
          height={32}
          src={user.avatar ?? null}
          alt={user.username}
          className="size-8"
        />

        <div className="flex flex-col">
          <span className="text-sm">{user.username}</span>
          <time className="text-xs text-slate-400">
            {formatToDateTime(created_at.toString())}
          </time>
        </div>
      </div>

      <div className="break-words px-4">{tweet}</div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-t-slate-100 px-4 py-3">
        <span className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <LikeButton isLiked={false} likeCount={likes} tweetId={id} />
          </span>
          <span className="flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="size-5 text-slate-400" />
            <span className="text-xs text-slate-400">{responses}</span>
          </span>
        </span>
      </div>
    </section>
  );
}
