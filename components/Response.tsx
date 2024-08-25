import { formatToDateTime } from "@/lib/utils";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";

export function Response({
  id,
  user,
  created_at,
  response,
  userId,
  responseDelete,
}: {
  id: number;
  user: { username: string; id: number; avatar: string | null };
  created_at: Date;
  response: string;
  userId: number;
  responseDelete: (id: number) => void;
}) {
  return (
    <li key={id} className="relative border-b border-slate-100">
      <div className="flex flex-1 gap-2 p-4">
        <Avatar
          width={32}
          height={32}
          src={user.avatar ?? null}
          alt={user.username}
          className="size-8"
        />

        <div className="flex flex-col gap-1">
          <span className="text-sm">
            {user.username}
            {userId === user.id ? (
              <small className="pl-1 text-rose">내 댓글</small>
            ) : null}
          </span>

          <p className="">{response}</p>

          <div className="flex items-center gap-4 mt-3 *:text-slate-400 *:text-xs">
            <span>{formatToDateTime(created_at.toString())}</span>
          </div>
        </div>
      </div>

      {userId === user.id ? (
        <button
          onClick={() => responseDelete(id)}
          className="absolute right-4 top-4 inline-flex items-center justify-center"
        >
          <XCircleIcon className="size-4 transition text-slate-400 hover:text-slate-700" />
        </button>
      ) : null}
    </li>
  );
}
