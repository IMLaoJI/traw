import { TrawButton } from 'components/Primitives/TrawButton/TrawButton';
import { useTrawApp } from 'hooks';
import SvgHeadset from 'icons/Headset';
import SvgPlayArrow from 'icons/play-arrow';
import React from 'react';
import { styled } from 'stitches.config';
import { PlayModeType } from 'types';

const TrawTopPanel = () => {
  const app = useTrawApp();

  const isEditMode = app.useStore((state) => state.player.mode === PlayModeType.EDIT);
  const { isRecording } = app.useStore((state) => state.recording);

  const handleStart = () => {
    app.startRecording();
  };

  const handleStop = () => {
    app.stopRecording();
  };

  const handleClickPlay = () => {
    app.playFromFirstBlock();
  };
  return (
    <StyledPanel>
      {isEditMode ? (
        <>
          {isRecording ? (
            <TrawButton onClick={handleStop} variant="primary">
              Stop Recording
            </TrawButton>
          ) : (
            <>
              <TrawButton onClick={handleStart} variant="primary">
                <SvgHeadset className="w-4 h-4  fill-current mr-[6px]" />
                Start Recording
              </TrawButton>
              <TrawButton onClick={handleClickPlay} variant="icon">
                <SvgPlayArrow className="w-6 h-6 color-white fill-current " />
              </TrawButton>
            </>
          )}
        </>
      ) : (
        <TrawButton onClick={app.backToEditor} variant="primary">
          Back to Edit
        </TrawButton>
      )}
    </StyledPanel>
  );
};

const StyledPanel = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
});

export default TrawTopPanel;
