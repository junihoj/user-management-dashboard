import React from "react";
import { redirect } from "next/navigation";
import { verifyAccessToken } from "@/lib/auth";
import { cookies } from "next/headers";
import DashboardSidebar from "./_components/dashboard-sidebar";
import DashboardTopBar from "./_components/dashboard-topbar";

const MainLayout = async ({ children }: React.PropsWithChildren) => {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("accessToken")?.value;

  // if (!accessToken) {
  //   redirect("/login");
  // }

  // const decoded = verifyAccessToken(accessToken);

  // if (!decoded) {
  //   redirect("/login");
  // }
  return (
    <div className="w-dvw h-dvh overflow-hidden">
      <div className="flex w-full overflow-hidden">
        {/* sidenav */}
        <DashboardSidebar />
        {/* main content */}
        <main className="flex-1 flex flex-col">
          <DashboardTopBar />
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
