import React from 'react';

export interface PanelHeaderProps {
  isRecording?: boolean;
  onClickStartRecording?: () => void;
  onClickStopRecording?: () => void;
}

export const PanelHeader = ({ isRecording, onClickStartRecording, onClickStopRecording }: PanelHeaderProps) => {
  return (
    <header className="flex mt-2 w-full gap-2 pl-2 items-center">
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
    </header>
  );
};

export default PanelHeader;
