import { LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignedIn from "./auth/signed-in";
import SignedOut from "./auth/signed-out";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useUser } from "~/hooks/useUser";
import { api } from "~/utils/api";

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  const appInfo = api.auth.getAppInfo.useQuery();

  const handleSignOut = () => {
    deleteCookie("code");
    router.reload();
  };

  return (
    <header className="bg-background sticky top-0 z-20 flex h-14 w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2 md:w-[200px]">
        <h1 className="font-bold">PieChat</h1>
      </div>
      <div className="flex items-center justify-end gap-4 md:w-[200px]">
        <div className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium">
          Public Beta
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 rounded-full p-0">
              <MenuIcon size="16px" className="text-zinc-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-56">
            <SignedIn>
              <DropdownMenuLabel className="font-normal text-zinc-500">
                @{user?.username}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </SignedIn>
            <SignedOut>
              <DropdownMenuItem asChild>
                <Link href={appInfo.data?.auth_url ?? ""}>
                  <LogInIcon size="16px" className="mr-2" />
                  Sign in
                </Link>
              </DropdownMenuItem>
            </SignedOut>
            <SignedIn>
              <DropdownMenuItem asChild>
                <Link href="https://pies.cf/panel/account">
                  <UserIcon size="16px" className="mr-2" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button onClick={() => void handleSignOut()} className="w-full">
                  <LogOutIcon size="16px" className="mr-2" />
                  Sign out
                </button>
              </DropdownMenuItem>
            </SignedIn>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
