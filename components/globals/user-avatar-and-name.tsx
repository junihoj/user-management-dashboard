import React from "react";
import CustomAvatar from "./custom-avatar";
import { cn } from "@/lib/utils";

type Props = {
  url?: string;
  name?: string;
  fallback?: string;
  className?: string;
  nameClass?: string;
};

const UserAvatarAndName = ({
  url,
  name,
  fallback,
  className,
  nameClass,
}: Props) => {
  return (
    <div className={cn("flex gap-x-2 items-center", className)}>
      <CustomAvatar
        url={url as string}
        fallback={fallback}
        className="w-10 h-10"
      />
      <p className={cn("body2", nameClass)}>{name}</p>
    </div>
  );
};

export default UserAvatarAndName;
