import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const UserSearchBox = (props: Props) => {
  return (
    <div className="w-1/3 ">
      <Input placeholder="search user" />
    </div>
  );
};

export default UserSearchBox;
