import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useUser } from "~/hooks/use-user";
import UserAvatar from "./auth/user-avatar";

export default function ProfileCard() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2.5">
        <UserAvatar />
        <CardTitle className="!my-0">{user.username}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Username
          </h2>
          <p>{user.username ?? "Unknown"}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Email
          </h2>
          <p>{user.email ?? "Unknown"}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-zinc-500 dark:text-zinc-300">
          ID: {user.id ?? "Unknown"}
        </p>
      </CardFooter>
    </Card>
  );
}
