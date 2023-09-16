import type { NextApiRequest } from "next";
import { env } from "~/env.mjs";
import type { User, UserPayload } from "~/server/api/routers/authRouter";

export async function getAuth(req: NextApiRequest): Promise<User | undefined> {
  const { code } = req.cookies;

  if (!code) {
    return undefined;
  }

  const res = await fetch(`https://api.pies.cf/account/info?code=${code}`, {
    headers: {
      Authorization: env.PIES_API_KEY,
    },
  });

  if (!res.ok) {
    return undefined;
  }

  const json = (await res.json()) as unknown;
  const { data } = json as UserPayload;
  return data;
}
