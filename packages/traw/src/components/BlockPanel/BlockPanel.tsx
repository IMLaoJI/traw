import React from 'react';
import PanelFooter from './PanelFooter';
import PanelHeader from './PanelHeader';
import BlockList from 'components/BlockPanel/BlockList';
import { useTrawApp } from 'hooks';
import { styled } from 'stitches.config';

export interface BlockPanelProps {
  handlePlayClick: (blockId?: string) => void;
  onClickStartRecording?: () => void;
  onClickStopRecording?: () => void;
}

export const BlockPanel = ({ handlePlayClick, onClickStartRecording, onClickStopRecording }: BlockPanelProps) => {
  const app = useTrawApp();

  const { isRecording, isTalking, recognizedText } = app.useStore((state) => state.recording);

  return (
    <StyledPanelContainer>
      <div className="flex flex-col w-full h-full p-2 bg-white rounded-xl">
        <PanelHeader
          isRecording={isRecording}
          onClickStartRecording={onClickStartRecording}
          onClickStopRecording={onClickStopRecording}
        />
        <BlockList handlePlayClick={handlePlayClick} />
        <PanelFooter
          isRecording={isRecording}
          isTalking={isTalking}
          recognizedText={recognizedText}
          onCreate={console.log}
        />
      </div>
    </StyledPanelContainer>
  );
};

export default BlockPanel;

const StyledPanelContainer = styled('div', {
  position: 'absolute',
  top: 71,
  right: 16,
  marginLeft: 16,
  minHeight: 0,
  width: 269,
  height: 'calc(100vh - 91px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 200,
  overflow: 'hidden',
  borderRadius: 15,
  transition: 'all 0.15s  cubic-bezier(0.4, 0, 0.2, 1)',
  fontSize: 13,

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
