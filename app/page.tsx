"use client";

import { useFormState } from "react-dom";
// action
import { handleForm } from "./action";
// components
import FormInput from "./components/form-input";
import FormButton from "./components/form-btn";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <form action={action} className="w-full max-w-sm flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={
            state?.errors?.filter((error) => error.includes("email")) ?? []
          }
        />
        <FormInput
          name="username"
          type="username"
          placeholder="Username"
          required
          errors={
            state?.errors?.filter((error) => error.includes("Username")) ?? []
          }
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={
            state?.errors?.filter((error) => error.includes("Password")) ?? []
          }
        />
        <FormButton text="Login" />
        {state?.success && (
          <div className="bg-green-500 text-white font-medium text-xl p-3 rounded-2xl text-center">
            Welcome back!
          </div>
        )}
      </form>
    </div>
  );
}
