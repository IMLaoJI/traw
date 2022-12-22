import {
  ArrowTopRightIcon,
  CursorArrowIcon,
  ImageIcon,
  Pencil1Icon,
  Pencil2Icon,
  TextIcon,
} from '@radix-ui/react-icons';
import * as React from 'react';
import { breakpoints } from 'utils/breakpoints';

import { useTldrawApp } from 'hooks/useTldrawApp';

import { TDSnapshot } from '@tldraw/tldraw';
import { styled } from 'stitches.config';
import { ShapesMenu } from './ShapesMenu';

const Panel = styled('div', {
  backgroundColor: '$panel',
  display: 'flex',
  flexDirection: 'row',
  boxShadow: '$panel',
  padding: '$2',
  border: '1px solid $panelContrast',
  gap: 0,
  overflow: 'hidden',
  variants: {
    side: {
      center: {
        borderRadius: 9,
      },
      left: {
        padding: 0,
        borderTop: 0,
        borderLeft: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 9,
        borderBottomLeftRadius: 0,
      },
      right: {
        padding: 0,
        borderTop: 0,
        borderRight: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 0,
      },
    },
  },
  '& hr': {
    height: 10,
    width: '100%',
    backgroundColor: 'red',
    border: 'none',
  },
});

const activeToolSelector = (s: TDSnapshot) => s.appState.activeTool;
const toolLockedSelector = (s: TDSnapshot) => s.appState.isToolLocked;
const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition;

export const PrimaryTools = React.memo(function PrimaryTools() {
  const app = useTldrawApp();

  const activeTool = app.useStore(activeToolSelector);

  const isToolLocked = app.useStore(toolLockedSelector);
  const dockPosition = app.useStore(dockPositionState);

  // const selectSelectTool = React.useCallback(() => {
  //   app.selectTool('select');
  // }, [app]);

  // const selectEraseTool = React.useCallback(() => {
  //   app.selectTool('erase');
  // }, [app]);

  // const selectDrawTool = React.useCallback(() => {
  //   app.selectTool(TDShapeType.Draw);
  // }, [app]);

  // const selectArrowTool = React.useCallback(() => {
  //   app.selectTool(TDShapeType.Arrow);
  // }, [app]);

  // const selectTextTool = React.useCallback(() => {
  //   app.selectTool(TDShapeType.Text);
  // }, [app]);

  // const selectStickyTool = React.useCallback(() => {
  //   app.selectTool(TDShapeType.Sticky);
  // }, [app]);

  // const uploadMedias = React.useCallback(async () => {
  //   app.openAsset();
  // }, [app]);

  const panelStyle = dockPosition === 'bottom' || dockPosition === 'top' ? 'row' : 'column';

  return (
    <StyledPanel side="center" id="TD-PrimaryTools" style={{ flexDirection: panelStyle }} bp={breakpoints}>
      <CursorArrowIcon />

      <Pencil1Icon />

      <ShapesMenu activeTool={activeTool} isToolLocked={isToolLocked} />

      <ArrowTopRightIcon />

      <TextIcon />

      <Pencil2Icon />

      <ImageIcon />
    </StyledPanel>
  );
});

const StyledPanel = styled(Panel, {
  variants: {
    bp: {
      mobile: {
        padding: '$0',
        borderRadius: '10px',
      },
      small: {
        padding: '$2',
      },
    },
  },
});
