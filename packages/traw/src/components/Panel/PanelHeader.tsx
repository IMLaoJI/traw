import React from 'react';
import SvgPause from '../../icons/pause';
import SvgPlayArrow from '../../icons/play-arrow';
import classNames from 'classnames';

export interface PanelHeaderProps {
  handlePlayClick: () => void;
  isPlaying: boolean;
}

export const PanelHeader = ({ handlePlayClick, isPlaying }: PanelHeaderProps) => {
  return (
    <header className="flex mt-2 w-full gap-2 pl-2 items-center">
      <button
        className={classNames('text-white text-xs rounded-full  hover:text-white w-5 h-5', {
          'bg-traw-purple': !isPlaying,
          'bg-traw-pink': isPlaying,
        })}
        onClick={handlePlayClick}
      >
        {isPlaying ? (
          <SvgPause className="fill-current w-full h-full" />
        ) : (
          <SvgPlayArrow className="fill-current w-full h-full" />
        )}
      </button>
      <div className="text-traw-grey-dark text-xs">00:00:01 / 00:00:02</div>
    </header>
  );
};

export default PanelHeader;
