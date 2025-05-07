import { cn } from "@/lib/utils";
import React from "react";

const DashboardSidebar = () => {
  return (
    <aside
      className={cn(
        "flex flex-col justify-between",
        "max-[800px]:hidden min-w-[10dvw] w-fit max-h-dvh",
        "py-8 rounded-2xl"
      )}
    >
      <div className="bg-gray-200 h-10 "></div>
      <div className="flex-1 bg-white rounded-2xl"></div>
    </aside>
  );
};

export default DashboardSidebar;
