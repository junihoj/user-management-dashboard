import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  selectItems: { value: string; label: string; [key: string]: any }[];
  value: any;
  defaultValue?: any;
  onValueChange: any;
  trigger?: React.ReactNode;
  className?: string;
  placeholder?: string;
  align?: "center" | "start" | "end" | undefined;
};

const CustomSelect = ({
  selectItems,
  value,
  defaultValue,
  onValueChange,
  trigger,
  className,
  placeholder,
  align,
}: Props) => {
  return (
    <Select
      onValueChange={onValueChange}
      value={value}
      defaultValue={defaultValue}
    >
      <SelectTrigger
        className={cn(
          "border-secondary border shadow-none bodyText-regular text-base leading-[100%] w-full data-[size=default]:h-fit p-4",
          className
        )}
      >
        {trigger ? (
          trigger
        ) : (
          <SelectValue
            placeholder={placeholder ?? "Select Item"}
            className="text-system-grey-8 font-medium text-sm leading-[150%] tracking-[0.1px]"
          />
        )}
      </SelectTrigger>
      <SelectContent className="font-sans" align={align ?? "end"}>
        {selectItems.map((item, idx) => (
          <SelectItem
            value={item.value}
            key={idx}
            className="hover:bg-gray-900"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
