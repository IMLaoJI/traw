import React from "react";
import SvgPlayArrow from "../../icons/play-arrow";
import SvgVolume from "../../icons/volume";
import SvgVolumeOff from "../../icons/volume-off";
import { UserAvatar } from "../Avatar/Avatar";

interface BlockItemProps {
  userName: string;
  date: string;
  blockText: string;
  isVoiceBlock: boolean;
  handlePlayClick: () => void;
}

const BlockItem = ({
  userName,
  date,
  blockText,
  isVoiceBlock,
  handlePlayClick,
}: BlockItemProps) => {
  return (
    <li className="rounded-[10px] bg-white p-2 w-full border border-traw-grey-10 mb-2.5">
      <div className="flex flex-1 flex-row items-center w-full grow">
        <div className="flex relative">
          <UserAvatar avatarUrl={undefined} userName={userName} />
          <div className="absolute flex items-center justify-center bottom-0 -right-[3px] w-[11px] h-[11px] rounded-full bg-white color-traw-grey">
            {isVoiceBlock ? (
              <SvgVolume className="fill-current w-2 h-2" />
            ) : (
              <SvgVolumeOff className="fill-current w-2 h-2" />
            )}
          </div>
        </div>
        <div className="font-bold text-[13px] text-traw-grey-dark ml-2">
          {userName}
        </div>
        <div className="text-traw-grey-100 text-[10px] ml-1">{date}</div>
        <div className="flex grow gap-1 justify-end">
          <button
            className="rounded-full hover:bg-black/[.04] p-1 text-traw-grey-100"
            onClick={handlePlayClick}
          >
            <SvgPlayArrow className="fill-current w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-2 text-[13px] text-traw-gry p-1">{blockText}</div>
    </li>
  );
};

export default BlockItem;
