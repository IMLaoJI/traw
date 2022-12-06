import React from "react";
import SvgPlayArrow from "../../icons/play-arrow";

interface PanelHeaderProps {
  handlePlayClick: () => void;
}

const PanelHeader = ({ handlePlayClick }: PanelHeaderProps) => {
  return (
    <header className="flex mt-2 w-full gap-2 pl-2 items-center">
      <button
        className="text-traw-purple text-xs rounded-full border  bg-white hover:bg-traw-purple hover:text-white p-0.5"
        onClick={handlePlayClick}
      >
        <SvgPlayArrow className="fill-current w-4 h-4" />
      </button>
      <div className="text-traw-grey-dark text-xs">00:00:00 / 00:00:00</div>
    </header>
  );
};
export default PanelHeader;
