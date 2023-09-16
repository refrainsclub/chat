import { useUser } from "~/hooks/use-user";

export default function Home() {
  const { user } = useUser();

  if (user) return <p>Hello {user.username}</p>;

  return <p>You are signed out</p>;
}
