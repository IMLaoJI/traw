import React, { memo, MouseEventHandler } from "react";
import SvgExit from "../../../icons/exit";
export interface LeaveCallButtonProps {
  onClick?: MouseEventHandler;
}

export const LeaveCallButton = memo(function LeaveCallButton({
  onClick,
}: LeaveCallButtonProps) {
  return (
    <button onClick={onClick} id="stop_record">
      <SvgExit />
    </button>
  );
});

export default LeaveCallButton;
