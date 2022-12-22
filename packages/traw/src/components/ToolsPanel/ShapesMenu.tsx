import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { styled } from '@stitches/react';
import { TDShapeType, TDSnapshot, TDToolType } from '@tldraw/tldraw';
import { useTldrawApp } from 'hooks/useTldrawApp';

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

interface ShapesMenuProps {
  activeTool: TDToolType;
  isToolLocked: boolean;
}

type ShapeShape = TDShapeType.Rectangle | TDShapeType.Ellipse | TDShapeType.Triangle | TDShapeType.Line;

const shapeShapes: ShapeShape[] = [TDShapeType.Rectangle, TDShapeType.Ellipse, TDShapeType.Triangle, TDShapeType.Line];

const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition;

export const ShapesMenu = React.memo(function ShapesMenu({ activeTool, isToolLocked }: ShapesMenuProps) {
  const app = useTldrawApp();

  const dockPosition = app.useStore(dockPositionState);

  const [lastActiveTool, setLastActiveTool] = React.useState<ShapeShape>(TDShapeType.Rectangle);

  React.useEffect(() => {
    if (shapeShapes.includes(activeTool as ShapeShape) && lastActiveTool !== activeTool) {
      setLastActiveTool(activeTool as ShapeShape);
    }
  }, [activeTool]);

  const selectShapeTool = React.useCallback(() => {
    app.selectTool(lastActiveTool);
  }, [activeTool, app]);

  const handleDoubleClick = React.useCallback(() => {
    app.toggleToolLock();
  }, [app]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      if (app.shiftKey) {
        e.preventDefault();
      }
    }
  }, []);

  const isActive = shapeShapes.includes(activeTool as ShapeShape);
  const contentSide = dockPosition === 'bottom' || dockPosition === 'top' ? 'top' : dockPosition;

  const panelStyle = dockPosition === 'bottom' || dockPosition === 'top' ? 'row' : 'column';

  return (
    <DropdownMenu.Root dir="ltr" onOpenChange={selectShapeTool}>
      <DropdownMenu.Trigger dir="ltr" asChild id="TD-PrimaryTools-Shapes">
        <button
          disabled={isActive && app.shiftKey} // otherwise this continuously opens and closes on "SpacePanning"
          // variant="primary"
          onDoubleClick={handleDoubleClick}
          // isToolLocked={isActive && isToolLocked}
          // isActive={isActive}
          onKeyDown={handleKeyDown}
        >
          {/* {shapeShapeIcons[lastActiveTool]} */}
          icon
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild side={contentSide} sideOffset={12}>
        <Panel side="center" style={{ flexDirection: panelStyle }}>
          {shapeShapes.map((shape, i) => (
            <DropdownMenu.Item asChild key={i}>
              <button
                // variant="primary"
                onClick={() => {
                  app.selectTool(shape);
                  setLastActiveTool(shape);
                }}
              >
                {/* {shapeShapeIcons[shape]} */}
                shape
              </button>
            </DropdownMenu.Item>
          ))}
        </Panel>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});
