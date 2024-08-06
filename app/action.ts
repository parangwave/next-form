"use server";

export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (password === "12345") {
    return {
      success: true,
      errors: [],
    };
  } else {
    return {
      success: false,
      errors: ["Wrong password"],
    };
  }
}
