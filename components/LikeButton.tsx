"use client";

import { useOptimistic } from "react";
import {
  likeTweet,
  unLikeTweet,
} from "@/app/(home)/(tabs)/tweets/[id]/actions";
import { HeartIcon as HeartIconLine } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, setState] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    setState(undefined);

    if (state.isLiked) {
      await unLikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <button onClick={onClick} className="flex items-center gap-1">
      {state.isLiked ? (
        <HeartIconFill className="size-5 text-rose" />
      ) : (
        <HeartIconLine className="size-5 text-slate-400" />
      )}

      <span className="text-slate-400">{state.likeCount}</span>
    </button>
  );
}
