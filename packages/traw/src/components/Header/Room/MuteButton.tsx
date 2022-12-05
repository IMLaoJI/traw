import React, { memo } from "react";
import SvgMic from "../../../icons/mic";
import SvgMicOff from "../../../icons/mic-off";
export interface MuteButtonProps {
  isMuted: boolean;
  onClick: () => void;
}

export const MuteButton = memo(function MuteButton({
  isMuted,
  onClick,
}: MuteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center rounded-full btn-grey"
    >
      {isMuted ? (
        <SvgMicOff className="fill-current w-4 h-4" />
      ) : (
        <SvgMic className="fill-current w-4 h-4" />
      )}
    </button>
  );
});

export default MuteButton;
