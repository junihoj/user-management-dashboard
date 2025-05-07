import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  url: string;
  fallback?: any;
  alt?: string;
};

const CustomAvatar = ({ className, url, fallback, alt }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={url} alt={alt} className={cn("", className)} />
      {fallback && (
        <AvatarFallback className="bodyText-medium">{fallback}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default CustomAvatar;
