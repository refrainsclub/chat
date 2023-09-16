import { useUser } from "~/hooks/use-user";

export default function SignedIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();
  if (!isSignedIn) return null;
  return children;
}
