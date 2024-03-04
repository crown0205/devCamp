import clsx from "clsx";
import React, { PropsWithChildren } from "react";

interface ErrorTextProps extends PropsWithChildren {
  className?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({ className, children }) => {
  return (
    <small className={clsx("text-red-500 font-semibold", className)}>
      {children}
    </small>
  );
};

export default ErrorText;
