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
            <StyledButton onClick={handleStop} variant="primary">
              Stop Recording
            </StyledButton>
          ) : (
            <>
              <StyledButton onClick={handleStart} variant="primary">
                <SvgHeadset className="w-4 h-4  fill-current mr-[6px]" />
                Start Recording
              </StyledButton>
              <StyledButton onClick={handleClickPlay} variant="icon">
                <SvgPlayArrow className="w-6 h-6 color-white fill-current " />
              </StyledButton>
            </>
          )}
        </>
      ) : (
        <StyledButton onClick={app.backToEditor} variant="primary">
          Back to Edit
        </StyledButton>
      )}
    </StyledPanel>
  );
};

const StyledPanel = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
});

const StyledButton = styled('button', {
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
  fontFamily: '$ui',
  fontWeight: 700,
  fontSize: '$2',
  border: '1px solid transparent',
  borderRadius: 50,
  backgroundColor: '#726EF6',
  color: 'white',
  padding: '4px 10px',

  '&[data-disabled]': {
    opacity: 0.3,
  },

  '&:disabled': {
    opacity: 0.3,
  },

  '&:hover': {
    backgroundColor: 'rgb(79, 77, 172)',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '#726EF6',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgb(79, 77, 172)',
        },
      },
      text: {
        backgroundColor: 'transparent',
        color: '#9B9EB5',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
      icon: {
        padding: 1,
        backgroundColor: 'transparent',
        color: '#9B9EB5',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
});

export default TrawTopPanel;
