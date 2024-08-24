"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { handleForm } from "./action";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 ">
      <form className="flex flex-col gap-3 w-1/4" action={action}>
        <h1 className="self-center">Create-Account</h1>
        <Input
          type="email"
          name="email"
          placeholder="email"
          errors={state?.fieldErrors?.email || []}
          required
        />
        <Input
          type="text"
          name="username"
          placeholder="username"
          errors={state?.fieldErrors?.username}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
          required
        />
        <Button text="Create" />
      </form>
      <div>
        <p className="flex gap-3">
          이미 계정이 있으신가요?
          <Link href={"/log-in"} className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
