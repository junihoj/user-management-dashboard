"use client";

import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "../custom-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  metaData?: unknown;
}

const DashboardTable = <TData, TValue>({
  columns,
  data,
  metaData,
}: DataTableProps<TData, TValue>) => {
  return <CustomTable columns={columns} data={data} metaData={metaData} />;
};

export default DashboardTable;
