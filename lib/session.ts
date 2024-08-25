import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession() {
  const sessionPassword = process.env.COOKIE_PASSWORD;

  if (!sessionPassword || sessionPassword.length < 32) {
    throw new Error(
      "The session password is either not set or is too short. It must be at least 32 characters long."
    );
  }

  return getIronSession<SessionContent>(cookies(), {
    cookieName: "tweet-cookies",
    password: sessionPassword,
  });
}
