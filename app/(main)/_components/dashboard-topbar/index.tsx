import NotificationPopover from "@/components/popover/notification-popover";
import UserAvatarPopover from "@/components/popover/user-avatar-popover";
import { Aperture } from "lucide-react";
import React from "react";

const DashboardTopBar = () => {
  return (
    <div className="w-full flex justify-between items-center py-5">
      <Aperture />
      <div className="flex items-center gap-x-3">
        <NotificationPopover />
        <UserAvatarPopover />
      </div>
    </div>
  );
};

export default DashboardTopBar;
