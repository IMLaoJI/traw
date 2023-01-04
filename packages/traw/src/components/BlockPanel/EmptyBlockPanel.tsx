import React from 'react';
import EmptyContents from './EmptyContents';

interface EmptyBlockPanelProps {
  EmptyVoiceNote?: React.ReactNode;
}

const EmptyBlockPanel = ({ EmptyVoiceNote }: EmptyBlockPanelProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
      <EmptyContents />

      {EmptyVoiceNote}
    </div>
  );
};

export default EmptyBlockPanel;
