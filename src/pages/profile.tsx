import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useUser } from "~/hooks/useUser";
import crypto from "crypto";

export default function Test() {
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row gap-2.5">
        <Avatar>
          <AvatarImage
            src={`https://www.gravatar.com/avatar/${crypto
              .createHash("md5")
              .update(user.email ?? "")
              .digest("hex")}`}
          />
          <AvatarFallback>{user.username?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>{user.username}</CardTitle>
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
        <p className="text-sm text-zinc-500">ID: {user.id ?? "Unknown"}</p>
      </CardFooter>
    </Card>
  );
}
