import { getUser, logOut } from "@/app/(auth)/actions";
import MyTweetList from "@/components/TweetList";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getInitialMyTweets } from "./actions";
import { Prisma } from "@prisma/client";
import UserAvatar from "@/components/Avatar";
import NotFoundPage from "@/app/not-found";
import { redirect } from "next/navigation";

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialMyTweets>;

export default async function UserPage() {
  const user = await getUser();
  if (!user) {
    return NotFoundPage;
  }

  const initialTweets = await getInitialMyTweets(user?.id!);

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-4 border-b border-b-slate-200">
        <Link href={`/users/${user?.id}/edit`} className="relative">
          <PencilIcon className="absolute bottom-0 -right-5 size-5" />
          <UserAvatar
            width={60}
            height={60}
            src={user.avatar}
            alt={user.username}
          />
        </Link>
        <span className="text-base">{user?.username}</span>
        {user.bio && <p className="text-sm text-slate-600">{user.bio}</p>}

        <button
          className="absolute right-5 flex items-center gap-1 text-slate-400 text-xs border p-2"
          onClick={handleLogOut}
        >
          로그아웃
        </button>
      </div>

      <MyTweetList initialTweets={initialTweets} />
    </>
  );
}
