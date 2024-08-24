import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
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
