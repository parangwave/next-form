import getSession from "@/lib/session";
import db from "@/lib/db";

export default async function Home() {
  async function getProfile() {
    "use server";
    const session = await getSession();

    return await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
  }

  const user = await getProfile();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 ">
      <h1 className="self-center">Home & Profile</h1>
      <div>
        <p>ID: {user?.id}</p>
        <p>Email: {user?.email}</p>
        <p>Username: {user?.username}</p>
      </div>
    </div>
  );
}
