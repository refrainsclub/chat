import { useUser } from "~/hooks/useUser";

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (user) {
    return <p>Hello @{user.username}</p>;
  }

  return <p>Please sign in</p>;
}
