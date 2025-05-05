import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="w-dvw h-dvh mx-auto">{children}</div>;
};

export default AuthLayout;
