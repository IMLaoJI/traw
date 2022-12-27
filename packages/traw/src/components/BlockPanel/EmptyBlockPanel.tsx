import SvgHeadset from 'icons/Headset';
import React from 'react';
import Lottie from 'react-lottie';
import HansCollaborationAnimation from 'static/json/hands-collaboration.json';
import { CopyIcon } from '@radix-ui/react-icons';
interface EmptyBlockPanelProps {
  onClickStartRecording: () => void;
  documentId: string;
}

const EmptyBlockPanel = ({ onClickStartRecording, documentId }: EmptyBlockPanelProps) => {
  const clickCopyLink = () => {
    // TODO. Implement copy link
    console.log('copy link', documentId);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="text-traw-purple text-[15px] text-center font-['EliceDigitalBaeum']">
        비디오 녹화부터 편집 그리고 공유까지.
        <br />
        어디서나 그리면서 설명하세요.
      </div>
      <div>
        <Lottie options={{ animationData: HansCollaborationAnimation }} />
      </div>
      <button
        className="flex gap-1 items-center text-traw-purple font-[13px] border border-traw-purple rounded-full px-3 py-1 hover:bg-traw-purple hover:text-white transition-colors"
        onClick={onClickStartRecording}
      >
        <SvgHeadset className="fill-current w-5 h-4" />
        트로우 녹화 시작하기
      </button>
      <button className="text-traw-purple font-[13px] flex items-center gap-3" onClick={clickCopyLink}>
        초대 링크 <CopyIcon />
      </button>
    </div>
  );
};

export default EmptyBlockPanel;
