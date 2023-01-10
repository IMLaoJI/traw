import useDeviceDetect from 'hooks/useDeviceDetect';
import React, { ReactNode } from 'react';

import { TopPanelDesktop } from './TopPanel.desktop';
import { TopPanelMobile } from './TopPanel.mobile';

export interface TopPanelProps {
  Room?: ReactNode;
  handleChangeTitle?: (newValue: string) => void;
  handleNavigateHome?: () => void;
}

export const TopPanel = React.memo(function TopPanel({ Room, handleChangeTitle, handleNavigateHome }: TopPanelProps) {
  const { isBrowser } = useDeviceDetect();

  return isBrowser ? (
    <TopPanelDesktop Room={Room} handleChangeTitle={handleChangeTitle} handleNavigateHome={handleNavigateHome} />
  ) : (
    <TopPanelMobile Room={Room} handleChangeTitle={handleChangeTitle} handleNavigateHome={handleNavigateHome} />
  );
});
