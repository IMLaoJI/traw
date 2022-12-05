import React, { memo, MouseEventHandler } from "react";
import SvgExit from "../../../icons/exit";
export interface LeaveCallButtonProps {
  onClick?: MouseEventHandler;
}

export const LeaveCallButton = memo(function LeaveCallButton({
  onClick,
}: LeaveCallButtonProps) {
  return (
    <button
      onClick={onClick}
      id="stop_record"
      className="rounded-full flex justify-center items-center  btn-grey"
    >
      <SvgExit className="fill-current w-4 h-4" />
    </button>
  );
});

export default LeaveCallButton;
