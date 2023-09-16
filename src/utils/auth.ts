import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import type { User, UserPayload } from "~/server/api/routers/authRouter";
import crypto from "crypto";

export async function getAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<User | undefined> {
  const { code } = req.cookies;

  if (!code) {
    return undefined;
  }

  const result = await fetch(`https://api.pies.cf/account/info?code=${code}`, {
    headers: {
      Authorization: env.PIES_API_KEY,
    },
  });

  if (!result.ok) {
    res.setHeader(
      "Set-Cookie",
      `code=deleted; path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );

    return undefined;
  }

  const json = (await result.json()) as unknown;
  const { data } = json as UserPayload;
  const emailHash = crypto
    .createHash("md5")
    .update(data?.email ?? "")
    .digest("hex");
  return { ...data, gravatar: `https://gravatar.com/avatar/${emailHash}` };
}
