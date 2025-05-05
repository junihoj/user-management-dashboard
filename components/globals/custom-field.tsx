import { cn } from "@/lib/utils";
import React from "react";
import { Control, Path } from "react-hook-form";
import { TypeOf, ZodType } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type CustomFieldProps<T extends ZodType<any, any>> = {
  control: Control<TypeOf<T>>;
  render: (props: { field: any }) => React.ReactNode;
  name: Path<TypeOf<T>>;
  formLabel?: string;
  className?: string;
  labelClass?: string;
  schema: T;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  iconClick?: (v?: any) => void;
};

export const CustomField = <T extends ZodType<any, any>>({
  control,
  render,
  name,
  formLabel,
  className,
  schema,
  labelClass,
  icon,
  iconPosition = "right",
  iconClassName,
  iconClick = () => {},
}: CustomFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          {formLabel && (
            <FormLabel
              className={cn("text-sm text-gray-800 font-medium", labelClass)}
            >
              {formLabel}
            </FormLabel>
          )}
          {icon ? (
            <div className="relative">
              {render({ field })}
              <span
                onClick={iconClick}
                className={cn(
                  "absolute top-1/2 transform -translate-y-1/2 right-3",
                  {
                    "left-3": iconPosition == "left",
                  },
                  iconClassName
                )}
              >
                {icon}
              </span>
            </div>
          ) : (
            <FormControl>{render({ field })}</FormControl>
          )}

          <FormMessage className="text-error" />
        </FormItem>
      )}
    />
  );
};
