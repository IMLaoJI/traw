import React from 'react';
import { memo, MouseEventHandler } from 'react';
import SvgHeadset from '../../../icons/Headset';

export interface JoinCallButtonProps {
  isBrowser?: boolean;
  onClick?: MouseEventHandler;
}

export const JoinCallButton = memo(function JoinCallButton({ isBrowser, onClick }: JoinCallButtonProps) {
  return (
    <button
      onClick={onClick}
      id="start_record"
      className="rounded-full bg-traw-purple pl-2 pr-3 py-1.5 flex justify-center items-center text-white"
    >
      <SvgHeadset className="w-5 h-4 fill-current" />
      {isBrowser && <span className="font-bold text-sm ml-1">Join</span>}
    </button>
  );
});

export default JoinCallButton;
