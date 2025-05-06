import NotificationPopover from "@/components/popover/notification-popover";
import { Aperture } from "lucide-react";
import React from "react";

const DashboardTopBar = () => {
  return (
    <div className="w-full flex justify-between">
      <Aperture />
      <NotificationPopover />
    </div>
  );
};

export default DashboardTopBar;
