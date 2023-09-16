import { useUser } from "~/hooks/use-user";

export default function SignedIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (isSignedIn || !isLoaded) return null;

  return children;
}
