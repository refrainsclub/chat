import { getCookie, hasCookie } from "cookies-next";
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
    enabled: hasCookie("code"),
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (!getUser.data) return;
    setUser(getUser.data);
    setIsSignedIn(!!getUser.data);
  }, [getUser.data]);

  useEffect(() => {
    setIsLoaded(!getUser.isFetching);
  }, [getUser.isFetching]);

  return (
    <UserContext.Provider value={{ user, isLoaded, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
