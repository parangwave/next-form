"use client";
import { useFormState } from "react-dom";
import { handleForm } from "./action";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Link from "next/link";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 ">
      <form className="flex flex-col gap-3 w-1/4" action={action}>
        <h1 className="self-center">Login</h1>
        <Input
          type="email"
          name="email"
          placeholder="email"
          errors={state?.fieldErrors?.email || []}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          errors={state?.fieldErrors?.password}
          required
        />
        <Button text="login" />
      </form>
      <div>
        <p className="flex gap-3">
          계정이 없으신가요?
          <Link href={"/create-account"} className="text-blue-500 underline">
            Create-Account
          </Link>
        </p>
      </div>
    </div>
  );
}
