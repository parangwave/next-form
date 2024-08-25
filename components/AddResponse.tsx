"use client";

import { addResponse } from "@/app/(home)/(tabs)/tweets/[id]/actions";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function AddResponse({ id }: { id: number }) {
  const addRespWithId = useCallback(
    async (state: { error: string } | null | undefined, response: unknown) => {
      // FormData 형식의 response인지 확인
      if (response instanceof FormData) {
        return addResponse(id, response);
      }
      return { error: "Invalid payload" };
    },
    [id]
  );
  const [state, dispatch] = useFormState(addRespWithId, { error: "" });
  const { pending } = useFormStatus();

  return (
    <form
      action={dispatch}
      className="flex items-center justify-between gap-1 bg-white p-1.5 px-4 pr-3 w-[393px] border-t border-slate-200"
    >
      {state?.error && (
        <span className="text-red-500 font-medium text-left text-xs">
          * <span className="text-red-500">{state?.error}</span>
        </span>
      )}

      <label className="w-full">
        <input
          type="text"
          name="response_add"
          placeholder="댓글을 입력해주세요."
          required
          className={`w-full bg-slate-100 rounded-full p-2 px-4 ${
            state?.error ? "outline outline-2 outline-rose" : ""
          }`}
        />
      </label>

      <button disabled={pending} className="">
        {pending ? (
          <ArrowPathRoundedSquareIcon className="size-6 animate-spin" />
        ) : (
          <ArrowUpCircleIcon className="size-9 text-slate-400" />
        )}
      </button>
    </form>
  );
}
