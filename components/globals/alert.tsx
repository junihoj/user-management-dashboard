import { BadgeCheck, CircleAlert } from "lucide-react";
import React from "react";

type Props = {
  message: string;
};

export const AlertError = ({ message }: Props) => {
  return (
    <div className="bg-system-alert flex gap-x-2 w-full h-full">
      <CircleAlert className="w-5 h-5 stroke-error" />
      <p className="text-error rounded font-normal font-raleway text-base">
        {message}
      </p>
    </div>
  );
};

export const AlertSuccess = ({ message }: Props) => {
  return (
    <div className="bg-[#2ECC71] flex gap-x-2 w-full h-full">
      <BadgeCheck className="w-5 h-5 stroke-white" />
      <p className="text-white rounded font-normal font-raleway text-base">
        {message}
      </p>
    </div>
  );
};

export const AlertInfo = ({ message }: Props) => {
  return (
    <div className="bg-indigo-200 flex gap-x-2 w-full h-full">
      <BadgeCheck className="w-5 h-5 stroke-indigo-700" />
      <p className="text-indigo-700 rounded font-normal font-raleway text-base">
        {message}
      </p>
    </div>
  );
};
