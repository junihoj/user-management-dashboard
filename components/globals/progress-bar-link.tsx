"use client";
import { useProgressBar } from "@/providers/progress-bar-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, startTransition } from "react";

export function ProgressBarLink({
  href,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  let progress = useProgressBar();
  let router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        progress.start();

        startTransition(() => {
          router.push(href.toString());
          progress.done();
        });
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
