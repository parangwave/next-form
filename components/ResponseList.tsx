"use client";

import { deleteResponse } from "@/app/(home)/(tabs)/tweets/[id]/actions";
import { Response } from "./Response";
import { ResponseProps } from "@/lib/types";

export default function ResponseList({
  id,
  userId,
  responses,
}: {
  id: number;
  userId: number;
  responses: ResponseProps[];
}) {
  return (
    <>
      <ul className="flex flex-col overflow-y-auto border-t-8 border-t-slate-200">
        {responses.length === 0 ? (
          <li className="p-4 text-slate-400">댓글을 한 번 남겨볼까요?</li>
        ) : (
          responses.map((response) => (
            <Response
              key={response.id}
              id={response.id}
              user={response.user}
              created_at={response.created_at}
              response={response.response}
              userId={userId}
              responseDelete={deleteResponse}
            />
          ))
        )}
      </ul>
    </>
  );
}
