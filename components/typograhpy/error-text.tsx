import React from "react";

type Props = {
  message?: string;
};

const ErrorText = ({ message }: Props) => {
  return <span className="text-error">{message}</span>;
};

export default ErrorText;
