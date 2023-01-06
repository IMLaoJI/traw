import * as React from 'react';
import useDeviceDetect from 'hooks/useDeviceDetect';
import { SlideListPanelDesktop } from './SlideListPanel.desktop';
import { SlideListPanelMobile } from './SlideListPanel.mobile';

export const SlideListPanel = React.memo(function SlideListPanel() {
  const { isBrowser } = useDeviceDetect();

  return isBrowser ? <SlideListPanelDesktop /> : <SlideListPanelMobile />;
});
