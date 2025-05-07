"use client";

import UserAvatarAndName from "@/components/globals/user-avatar-and-name";
import UserFormModal from "@/components/modals/user-form-modal";
import DeleteUserModal from "@/components/modals/delete-user-modal";
import { dummyUsers } from "@/constants/dummy-data";
import { getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format, isValid } from "date-fns";
export const columns: ColumnDef<(typeof dummyUsers)[0], unknown>[] = [
  {
    header: "Name",
    cell: (props) => {
      const originalRow = props.row.original;
      const url = originalRow.profilePhoto;
      const name = originalRow.name;
      const fallback = getInitials(name);
      // const metaData: any = props.table.options.meta as any;
      return (
        <div className="cursor-pointer hover:underline">
          <UserAvatarAndName url={url} name={name} fallback={fallback} />
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (props) => {
      const date = new Date(props.getValue() as any);
      const valid = isValid(date);
      return valid ? format(date, "MMM dd, yyyy") : "Invalid Date";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: (props) => {
      const date = new Date(props.getValue() as any);
      const valid = isValid(date);
      return valid ? format(date, "MMM dd, yyyy") : "Invalid Date";
    },
  },
  {
    header: "Actions",
    cell: (props) => {
      const originalRow = props.row.original;
      const id = originalRow?._id;
      const name = `${originalRow?.name}`;
      return (
        <div className="flex gap-x-2">
          <UserFormModal
            data={originalRow}
            className="w-fit"
            buttonText="Edit"
          />
          <DeleteUserModal id={id} name={name} />
        </div>
      );
    },
  },
];
