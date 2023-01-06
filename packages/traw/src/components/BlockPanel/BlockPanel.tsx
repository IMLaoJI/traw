import useDeviceDetect from 'hooks/useDeviceDetect';
import React, { ReactNode } from 'react';
import BlockPanelDesktop from './BlockPanel.Desktop';
import BlockPanelMobile from './BlockPanel.Mobile';

export interface BlockPanelProps {
  handlePlayClick: (blockId?: string) => void;
  components?: {
    EmptyVoiceNote?: ReactNode;
    EmptyDocumentPopup?: ReactNode;
  };
}

export const BlockPanel = ({ handlePlayClick, components }: BlockPanelProps) => {
  const { isBrowser } = useDeviceDetect();

  return isBrowser ? (
    <BlockPanelDesktop handlePlayClick={handlePlayClick} components={components} />
  ) : (
    <BlockPanelMobile handlePlayClick={handlePlayClick} components={components} />
  );
};

export default BlockPanel;
