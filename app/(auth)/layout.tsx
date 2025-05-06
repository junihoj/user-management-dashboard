import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-dvw h-dvh mx-auto flex justify-center items-center bg-gray-200">
      {children}
    </div>
  );
};

export default AuthLayout;
