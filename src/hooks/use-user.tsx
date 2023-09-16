import React, { createContext, useContext } from "react";
import type { User } from "~/server/api/routers/authRouter";
import { api } from "~/utils/api";

interface UserContext {
  user?: User | null;
  isSignedIn: boolean;
}

const UserContext = createContext<UserContext>({
  user: null,
  isSignedIn: false,
});

export function useUser(): UserContext {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const getUser = api.auth.getUser.useQuery();
  const user = getUser.data;
  const isSignedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
