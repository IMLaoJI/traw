import React from "react";
import { Fragment, ReactNode } from "react";
import CircularProgress from "../../Progress/CircularProgress";

interface CallButtonProps {
  children: ReactNode;
  isConnecting: boolean;
}

export const CallButton = ({ children, isConnecting }: CallButtonProps) => {
  return isConnecting ? <CircularProgress /> : <Fragment>{children}</Fragment>;
};

export default CallButton;
