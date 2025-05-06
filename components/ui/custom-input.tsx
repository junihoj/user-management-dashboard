import React, { useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const CustomInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, onBlur, error, ...rest } = props;

  return (
    <Input
      ref={ref}
      className={cn(
        " border shadow-none h-fit text-primary text-base font-normal w-full  ",
        "placeholder:opacity-100 placeholder:text-system-secondary placeholder:text-xs",
        "focus:ring-0 outline-none focus:outline-none focus:placeholder:opacity-0",
        className
      )}
      {...rest}
    />
  );
});

export default CustomInput;
CustomInput.displayName = "CustomInput";
