import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export interface UserPayload {
  message?: string;
  data?: User;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  created?: string;
  "2fa"?: string;
  admin?: boolean;
  verified?: boolean;
}

export interface AppInfoPayload {
  message?: string;
  data?: AppInfo;
}

export interface AppInfo {
  id: number;
  owner: number;
  name: string;
  redirect_uri_agreed: string;
  redirect_uri_denied: string;
  verified: boolean;
  intents: Intent[];
  auth_url: string;
}

export enum Intent {
  "AccountID" = 0,
  "AccountEmail" = 1,
  "AccountUsername" = 2,
  "AccountPermissions" = 3,
  "AccountCreationDate" = 4,
  "AccountVerified" = 5,
  "AccountIsAdmin" = 6,
  "Account2FAEnabled" = 7,
  "ViewLicenses" = 8,
  "ViewURLShort" = 9,
  "CreateURLShort" = 10,
  "ViewTunnels" = 11,
  "ViewLinks" = 12,
}

export const authRouter = createTRPCRouter({
  getUser: publicProcedure.input(z.string().min(1)).query(async ({ input }) => {
    const res = await fetch(`https://api.pies.cf/account/info?code=${input}`, {
      headers: {
        Authorization: env.PIES_API_KEY,
      },
    });

    if (!res.ok) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Could not get user",
      });
    }

    const payload: UserPayload = (await res.json()) as UserPayload;

    return payload.data;
  }),
  getAppInfo: publicProcedure.query(async () => {
    const res = await fetch("https://api.pies.cf/app/info", {
      headers: {
        Authorization: env.PIES_API_KEY,
      },
    });

    if (!res.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unable to get app info",
      });
    }

    const payload: AppInfoPayload = (await res.json()) as AppInfoPayload;

    return payload.data;
  }),
});
