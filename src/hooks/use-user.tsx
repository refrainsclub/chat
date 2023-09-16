import React, { createContext, useContext } from "react";
import type { User } from "~/server/api/routers/authRouter";
import { api } from "~/utils/api";

interface UserContext {
  user?: User;
  isSignedIn: boolean;
}

const UserContext = createContext<UserContext>({
  user: undefined,
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
  const getUser = api.auth.getUser.useQuery(undefined);
  const data = getUser.data;
  const dataLength = data !== undefined ? Object.keys(data).length : 0;
  const user = dataLength ? data : undefined;
  const isSignedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
