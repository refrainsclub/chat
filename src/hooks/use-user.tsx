import { TRPC_ERROR_CODES_BY_KEY } from "@trpc/server/rpc";
import { deleteCookie, getCookie } from "cookies-next";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "~/server/api/routers/authRouter";
import { api } from "~/utils/api";

interface UserContext {
  user?: User;
  isLoaded: boolean;
  isSignedIn: boolean;
}

const UserContext = createContext<UserContext>({
  user: undefined,
  isLoaded: false,
  isSignedIn: false,
});

export function useUser(): UserContext {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const getUser = api.auth.getUser.useQuery();
  const user = getUser.data;
  const isLoaded = getUser.isFetched;
  const isSignedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isLoaded, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
