import React from "react";
import { Fragment, memo } from "react";
import LeaveCallButton from "./LeaveCallButton";
import MuteButton from "./MuteButton";

export interface CallControlProps {
  isMicMuted: boolean;

  onEndCall: () => void;
  onToggleMic: () => void;
}

export const CallControl = memo(function CallControl({
  isMicMuted,
  onToggleMic,
  onEndCall,
}: CallControlProps) {
  return (
    <Fragment>
      <MuteButton isMuted={isMicMuted} onClick={onToggleMic} />
      <LeaveCallButton onClick={onEndCall} />
    </Fragment>
  );
});

export default CallControl;
