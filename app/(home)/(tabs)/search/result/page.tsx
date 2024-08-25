import { notFound } from "next/navigation";
import TweetSearchList from "@/components/SearchList";
import { getSearchedTweet } from "../actions";
import SearchInput from "@/components/SearchInput";

interface SearchResultPageProps {
  searchParams: { search: string };
}

export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const search = searchParams.search;

  if (!search) {
    notFound();
  }

  const tweets = await getSearchedTweet(search);

  return (
    <>
      <div className="px-4">
        <SearchInput />
      </div>
      {search ? (
        <div className="flex items-center justify-center gap-1 p-4 border-b-8 border-b-slate-200">
          <span className="text-rose">{search}</span>검색결과
          <span>
            <span className="text-rose">{tweets.length}</span>개
          </span>
        </div>
      ) : (
        "검색 결과"
      )}

      <TweetSearchList initialTweets={tweets} />
    </>
  );
}
