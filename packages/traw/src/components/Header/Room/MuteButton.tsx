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
      className="rounded-full bg-traw-grey pl-2 pr-3 py-1.5 flex justify-center items-center "
    >
      {isMuted ? <SvgMicOff /> : <SvgMic />}
    </button>
  );
});

export default MuteButton;
