"use client";

import { useEffect, useRef, useState } from "react";
import { getTweetMore } from "@/app/(home)/(main)/actions";
import { InitialTweets } from "@/app/(home)/(main)/page";
import Tweet from "./Tweet";
import Link from "next/link";
import { formatToMaxLength } from "@/lib/utils";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const removeDuplicateTweets = (tweets: any[]) => {
  const seenIds = new Set();
  return tweets.filter((tweet) => {
    if (seenIds.has(tweet.id)) {
      return false;
    } else {
      seenIds.add(tweet.id);
      return true;
    }
  });
};

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(removeDuplicateTweets(initialTweets));
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreTweets = async () => {
    // if loading or last page, stop
    if (isLoading || lastPage) return;

    setIsLoading(true);
    const newTweets = await getTweetMore(page + 1);
    if (newTweets.length !== 0) {
      // new + old tweets -> 중복 제거
      const filteredTweets = removeDuplicateTweets([...tweets, ...newTweets]);

      setPage((prev) => prev + 1);
      setTweets(filteredTweets);
    } else {
      // if no tweet
      setLastPage(true);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    // if loading or last page, stop
    if (isLoading || lastPage) return;

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const clientHeight = containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;

      // scroll end -> 데이터 로드
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreTweets();
      }

      // scroll top btn 노출
      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoading, lastPage]);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      <ul className="flex flex-col">
        {tweets.map((tweet) => (
          <li key={tweet.id} className="border-b-8 border-b-slate-200">
            <Link href={`/tweets/${tweet.id}`}>
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
            </Link>
          </li>
        ))}
      </ul>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-5 rounded-lg border border-slate-400 bg-slate-50 p-[10px] text-slate-400"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="size-20" />
        </button>
      )}

      {isLoading && (
        <span className="flex h-8 items-start justify-center bg-slate-200 text-center">
          <ArrowPathIcon className="size-20 animate-spin" />
        </span>
      )}
    </div>
  );
}
