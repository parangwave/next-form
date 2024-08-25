import EditProfile from "@/components/EditProfile";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export type UserInfo = Prisma.PromiseReturnType<typeof getUser>;

export default async function EditUserProfile({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const user = await getUser(id);

  return (
    <>
      <EditProfile userInfo={user} />
    </>
  );
}
