import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomAvatar from "@/components/globals/custom-avatar";

type Props = {};

const UserAvatarPopover = (props: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <div className="flex gap-x-3 items-center">
          <CustomAvatar url="something" fallback="EU" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div>
          <div className="flex flex-col">
            <h4>Eucharia Odili</h4>
            <h5>ucharia@gmail.com</h5>
          </div>
          <div>
            {/* menu items */}
            <div></div>
            {/* logout */}
            <div></div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatarPopover;
