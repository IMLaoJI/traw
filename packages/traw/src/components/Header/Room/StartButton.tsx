import React from 'react';
import { memo, MouseEventHandler } from 'react';
import SvgHeadset from '../../../icons/Headset';

export interface StartCallButtonProps {
  isBrowser?: boolean;
  onClick?: MouseEventHandler;
}

export const StartCallButton = memo(function StartCallButton({ isBrowser, onClick }: StartCallButtonProps) {
  return (
    <button
      onClick={onClick}
      id="start_record"
      className="rounded-full bg-traw-purple pl-2 pr-3 py-1.5 flex justify-center items-center text-white"
    >
      <SvgHeadset className="w-5 h-4 fill-current" />
      {isBrowser && <span className="font-bold text-sm ml-1">Start</span>}
    </button>
  );
});

export default StartCallButton;
