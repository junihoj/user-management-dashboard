import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren & {
  className?: string;
};

const TableTileText = ({ className, children }: Props) => {
  return (
    <p className={cn("text-primary-black text-xl font-semibold", className)}>
      {children}
    </p>
  );
};

export default TableTileText;
