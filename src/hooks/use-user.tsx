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
  const [user, setUser] = useState<User | undefined>(undefined);
  const cookie = getCookie("code");
  const getUser = api.auth.getUser.useQuery(cookie ?? "", {
    enabled: !!cookie,
    retry: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (!getUser.data) {
      return;
    }
    setUser(getUser.data);
    setIsSignedIn(!!getUser.data);
  }, [getUser.data]);

  useEffect(() => {
    if (getUser.isFetching) {
      return;
    }
    setIsLoaded(true);
  }, [getUser.isFetching]);

  useEffect(() => {
    if (getUser.error?.shape?.code !== TRPC_ERROR_CODES_BY_KEY.BAD_REQUEST) {
      return;
    }
    deleteCookie("code");
    setUser(undefined);
    setIsSignedIn(false);
  }, [getUser.error]);

  return (
    <UserContext.Provider value={{ user, isLoaded, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
