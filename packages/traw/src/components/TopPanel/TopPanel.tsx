import React, { ReactNode } from 'react';

import { styled } from 'stitches.config';
import { breakpoints } from 'utils/breakpoints';

export interface TopPanelProps {
  isRecording: boolean;
  onClickStartRecording: () => void;
  onClickStopRecording: () => void;
  // Room
  Room: ReactNode;
}

export const TopPanel = React.memo(function TopPanel({
  isRecording,
  onClickStopRecording,
  onClickStartRecording,
  Room,
}: TopPanelProps) {
  return (
    <>
      <StyledTopPanelContainer bp={breakpoints}>
        {Room}
        <div>
          {isRecording ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white rounded-full h-8 px-3 flex items-center justify-center gap-2"
              onClick={onClickStopRecording}
            >
              <svg
                className="text-red-500 hover:text-red-600"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="white" />
                <rect x="7" y="7" width="10" height="10" fill="currentColor" />
              </svg>
              Stop
            </button>
          ) : (
            <button
              className="bg-traw-purple hover:bg-indigo-600 text-white font-bold h-8 px-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-150"
              onClick={onClickStartRecording}
            >
              <svg
                className="text-red-500 hover:text-red-700"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="white" />
                <circle cx="12" cy="12" r="7" fill="currentColor" />
              </svg>
              Record
            </button>
          )}
        </div>
      </StyledTopPanelContainer>
    </>
  );
});

const StyledTopPanelContainer = styled('div', {
  position: 'absolute',
  top: 10,
  right: 16,
  marginLeft: 16,
  minHeight: 0,
  width: 'auto',
  height: 50,
  gap: '$4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 200,
  overflow: 'hidden',
  borderRadius: 15,
  transition: 'all 0.15s  cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: 13,
  backgroundColor: '#FFF',
  paddingLeft: 10,
  paddingRight: 10,
  boxShadow: '0px 10px 30px rgba(189, 188, 249, 0.3)',

  '& > div > *': {
    pointerEvents: 'all',
  },
  variants: {
    bp: {
      mobile: {},
      small: {},
      medium: {},
      large: {},
    },
  },
});
