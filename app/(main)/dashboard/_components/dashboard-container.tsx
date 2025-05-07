"use client";
import CustomPagination from "@/components/globals/custom-pagination";
import UserFormModal from "@/components/modals/user-form-modal";
import UsersTable from "@/components/tables/users";
import { columns } from "@/components/tables/users/columns";
import { dummyUsers } from "@/constants/dummy-data";
import { apiService } from "@/lib/api-service";
import { TUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UserSearchBox from "./user-search-box";

const DashboardContainer = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["users", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await apiService({ url: `/users` });
      return res as unknown as TUser[];
      // return [];
    },
  });
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex flex-col gap-y-6 ">
        <div className="bg-white rounded-2xl p-5 flex justify-between">
          <UserSearchBox />
          <UserFormModal />
        </div>

        {/* table section */}
        <div className="bg-white rounded-2xl p-5 flex-1 pb-10 overflow-hidden">
          <div className="">
            <UsersTable columns={columns} data={dummyUsers} />
          </div>
          <CustomPagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
