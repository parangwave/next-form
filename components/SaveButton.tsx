"use client";

import { useOptimistic } from "react";
import {
  saveTweet,
  unSaveTweet,
} from "@/app/(home)/(tabs)/tweets/[id]/actions";
import { BookmarkIcon as BookmarkIconLine } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconFill } from "@heroicons/react/24/solid";

interface ISaveButtonProps {
  isSaved: boolean;
  tweetId: number;
}

interface SaveState {
  isSaved: boolean;
}

export default function ButtonSave({ isSaved, tweetId }: ISaveButtonProps) {
  const [state, setState] = useOptimistic({ isSaved }, (prevState) => ({
    isSaved: !prevState.isSaved,
  }));

  const onClick = async () => {
    setState(undefined);

    try {
      if (state.isSaved) {
        await unSaveTweet(tweetId);
      } else {
        await saveTweet(tweetId);
      }
    } catch (error) {
      setState((prevState: SaveState) => ({
        ...prevState,
        isSaved: prevState.isSaved,
        saveCount: prevState.isSaved,
      }));
      console.error("Failed to update save status:", error);
    }
  };

  return (
    <button onClick={onClick} className="flex items-center gap-1">
      {state.isSaved ? (
        <BookmarkIconFill className="size-5 text-rose" />
      ) : (
        <BookmarkIconLine className="size-5 text-stone-400" />
      )}
    </button>
  );
}
