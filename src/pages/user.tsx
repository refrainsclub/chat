import Link from "next/link";
import { useUser } from "~/context/UserContext";

export default function Test() {
  const { user } = useUser();

  return (
    <>
      <p>ID: {user?.id ?? "Unknown"}</p>
      <p>Username: {user?.username ?? "Unknown"}</p>
      <p>Email: {user?.email ?? "Unknown"}</p>
      <p>Created: {user?.created ?? "Unknown"}</p>
      <p>2FA: {user?.["2fa"] ?? "Unknown"}</p>
      <p>Admin: {user?.admin ?? "Unknown"}</p>
      <p>Verified: {user?.verified ?? "Unknown"}</p>

      <Link href="/">Back</Link>
    </>
  );
}
