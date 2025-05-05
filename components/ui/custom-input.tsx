import React, { useState } from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const CustomInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, onBlur, error, ...rest } = props;
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div
      className={cn(
        "rounded-2xl px-4 py-2 max-[500px]:px-2 max-[500px]:py-1 flex flex-col border border-[rgba(144,144,144,0.2)]",
        { "py-4": !showLabel, "border-error": error }
      )}
    >
      {showLabel && (
        <label className="label text-system-secondary">
          {rest.placeholder}
        </label>
      )}

      <Input
        ref={ref}
        className={cn(
          "placeholder:opacity-100 border-none shadow-none p-0 h-fit text-primary-black text-base font-normal w-full placeholder:text-system-secondary placeholder:text-xs focus:ring-0 outline-none focus:outline-none focus:placeholder:opacity-0",
          className
        )}
        onBlur={(e) => {
          if (!e.target.value) {
            setShowLabel(false);
            return;
          }
          setShowLabel(true);
          if (onBlur) onBlur(e);
        }}
        onFocus={() => setShowLabel(true)}
        {...rest}
      />
    </div>
  );
});

export default CustomInput;
CustomInput.displayName = "CustomInput";
