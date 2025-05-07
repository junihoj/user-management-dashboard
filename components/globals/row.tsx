import React from "react";

type RowProps = React.PropsWithChildren & {};

const Row = ({ children }: RowProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4">{children}</div>
  );
};

export default Row;
