import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "~/context/UserContext";
import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const appInfo = api.auth.getAppInfo.useQuery();

  const handleLogin = async () => {
    const authUrl = appInfo.data?.auth_url;
    if (!authUrl) throw new Error("Auth url undefined");

    await router.push(authUrl);
  };

  const handleLogout = () => {
    deleteCookie("code");

    router.reload();
  };

  if (!isLoaded) return null;

  return (
    <>
      <p>
        Hello {user?.username ?? "user"}. You are{" "}
        {isSignedIn ? "signed in" : "signed out"}.
      </p>
      <div className="flex flex-col items-start">
        <button onClick={() => void handleLogin()}>
          Click to authenticate with pies.cf
        </button>
        <button onClick={() => void handleLogout()}>Click to logout</button>
        {user && <Link href="/user">User page</Link>}
      </div>
    </>
  );
}
