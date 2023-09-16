import { useUser } from "~/hooks/use-user";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import crypto from "crypto";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "~/utils";

const UserAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { user } = useUser();
  if (!user) return null;

  const gravatar = getGravatar(user.email ?? "");
  const fallback = user.username?.charAt(0);

  return (
    <Avatar ref={ref} className={cn("h-8 w-8", className)} {...props}>
      <AvatarImage src={gravatar} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
});
UserAvatar.displayName = AvatarPrimitive.Avatar.displayName;

function getMD5Hash(string: string) {
  return crypto.createHash("md5").update(string).digest("hex");
}

function getGravatar(email: string) {
  const hash = getMD5Hash(email);
  return `https://www.gravatar.com/avatar/${hash}`;
}

export default UserAvatar;
