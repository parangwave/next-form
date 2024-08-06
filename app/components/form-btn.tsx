"use client";

import { useFormStatus } from "react-dom";

interface IFormButtonProps {
  text: string;
}

export default function FormButton({ text }: IFormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`w-full bg-neutral-300 py-2 rounded-full hover:bg-neutral-400 transition-colors  ${
        pending ? "bg-neutral-400 text-neutral-600 opacity-70" : ""
      }`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
