import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import type { User, UserPayload } from "~/server/api/routers/authRouter";
import crypto from "crypto";
import { TRPCError } from "@trpc/server";

export async function getAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<User | null> {
  const { code } = req.cookies;

  if (!code) {
    return null;
  }

  const result = await fetch(`https://api.pies.cf/account/info?code=${code}`, {
    headers: {
      Authorization: env.PIES_API_KEY,
    },
  });

  if (result.status === 403) {
    res.setHeader(
      "Set-Cookie",
      `code=deleted; path=/; SameSite=Strict; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    );

    return null;
  }

  if (!result.ok) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not fetch user from /account/info endpoint",
    });
  }

  const json = (await result.json()) as unknown;
  const { data } = json as UserPayload;
  const emailHash = crypto
    .createHash("md5")
    .update(data?.email ?? "")
    .digest("hex");
  return { ...data, gravatar: `https://gravatar.com/avatar/${emailHash}` };
}
