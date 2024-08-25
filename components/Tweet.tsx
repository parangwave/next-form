import { formatToDateTime } from "@/lib/utils"
import { RiChat1Line } from "@remixicon/react"
import { TweetProps } from "@/types"
import UserAvatar from "../common/avatar"
import ButtonLike from "../button/button-like"

export default function TweetItem({
  tweet,
  id,
  user,
  created_at,
  _count: { likes, comments },
}: TweetProps) {
  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <UserAvatar
          width={32}
          height={32}
          src={user.avatar ?? null}
          alt={user.username}
          className="size-8"
        />

        <div className="flex flex-col">
          <span className="text-sm">{user.username}</span>
          <time className="text-xs text-zinc-400">
            {formatToDateTime(created_at.toString())}
          </time>
        </div>
      </div>

      <div className="break-words px-4">{tweet}</div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-t-zinc-100 px-4 py-3">
        <span className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ButtonLike isLiked={false} likeCount={likes} tweetId={id} />
          </span>
          <span className="flex items-center gap-1">
            <RiChat1Line className="size-5 text-zinc-400" />
            <span className="text-xs text-zinc-400">{comments}</span>
          </span>
        </span>
      </div>
    </section>
  )
}
