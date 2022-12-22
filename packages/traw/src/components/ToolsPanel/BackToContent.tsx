import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { useTldrawApp } from 'hooks/useTldrawApp';
import type { TDSnapshot } from '@tldraw/tldraw';
import { styled } from '@stitches/react';

export const MenuContent = styled('div', {
  position: 'relative',
  overflow: 'hidden',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 99997,
  minWidth: 180,
  pointerEvents: 'all',
  backgroundColor: '$panel',
  border: '1px solid $panelContrast',
  boxShadow: '$panel',
  padding: '$2 $2',
  borderRadius: '$3',
  font: '$ui',
  maxHeight: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none' /* for Internet Explorer, Edge */,
  scrollbarWidth: 'none',
  variants: {
    size: {
      small: {
        minWidth: 72,
      },
    },
    overflow: {
      true: {
        maxHeight: '60vh',
      },
    },
  },
});

const isEmptyCanvasSelector = (s: TDSnapshot) => {
  return s.appState.isEmptyCanvas && Object.keys(s.document.pages[s.appState.currentPageId].shapes).length > 0;
};

const isDebugModeSelector = (s: TDSnapshot) => s.settings.isDebugMode;
const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition;

export const BackToContent = React.memo(function BackToContent() {
  const app = useTldrawApp();

  const isEmptyCanvas = app.useStore(isEmptyCanvasSelector);
  const dockPosition = app.useStore(dockPositionState);
  const isDebugMode = app.useStore(isDebugModeSelector);

  const style = {
    bottom: dockPosition === 'bottom' && isDebugMode ? 120 : dockPosition === 'bottom' ? 80 : isDebugMode ? 60 : 20,
    left: '50%',
    transform: 'translate(-50%,0)',
  };

  if (!isEmptyCanvas) return null;

  return (
    <BackToContentContainer id="TD-Tools-Back_to_content" style={{ ...style }}>
      <button onClick={app.zoomToContent}>
        <FormattedMessage id="zoom.to.content" />
      </button>
    </BackToContentContainer>
  );
});

const BackToContentContainer = styled(MenuContent, {
  pointerEvents: 'all',
  width: 'fit-content',
  minWidth: 0,
  position: 'fixed',
  bottom: 0,
});
