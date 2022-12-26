import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CircleIcon, SquareIcon, VercelLogoIcon } from '@radix-ui/react-icons';
import { TDShapeType, TDSnapshot, TDToolType } from '@tldraw/tldraw';
import { Panel } from 'components/Primitives/Panel';
import { ToolButton } from 'components/Primitives/ToolButton';
import { Tooltip } from 'components/Primitives/Tooltip';
import { useTldrawApp } from 'hooks/useTldrawApp';
import { LineIcon } from 'icons/Line';
import * as React from 'react';

interface ShapesMenuProps {
  activeTool: TDToolType;
  isToolLocked: boolean;
}

type ShapeShape = TDShapeType.Rectangle | TDShapeType.Ellipse | TDShapeType.Triangle | TDShapeType.Line;

const shapeShapes: ShapeShape[] = [TDShapeType.Rectangle, TDShapeType.Ellipse, TDShapeType.Triangle, TDShapeType.Line];

const shapeShapeIcons = {
  [TDShapeType.Rectangle]: <SquareIcon />,
  [TDShapeType.Ellipse]: <CircleIcon />,
  [TDShapeType.Triangle]: <VercelLogoIcon />,
  [TDShapeType.Line]: <LineIcon />,
};

const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition;

export const ShapesMenu = React.memo(function ShapesMenu({ activeTool, isToolLocked }: ShapesMenuProps) {
  const app = useTldrawApp();

  const dockPosition = app.useStore(dockPositionState);

  const [lastActiveTool, setLastActiveTool] = React.useState<ShapeShape>(TDShapeType.Rectangle);

  React.useEffect(() => {
    if (shapeShapes.includes(activeTool as ShapeShape) && lastActiveTool !== activeTool) {
      setLastActiveTool(activeTool as ShapeShape);
    }
  }, [activeTool, lastActiveTool]);

  const selectShapeTool = React.useCallback(() => {
    app.selectTool(lastActiveTool);
  }, [app, lastActiveTool]);

  const handleDoubleClick = React.useCallback(() => {
    app.toggleToolLock();
  }, [app]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === ' ') {
        if (app.shiftKey) {
          e.preventDefault();
        }
      }
    },
    [app.shiftKey],
  );

  const isActive = shapeShapes.includes(activeTool as ShapeShape);
  const contentSide = dockPosition === 'bottom' || dockPosition === 'top' ? 'top' : dockPosition;

  const panelStyle = dockPosition === 'bottom' || dockPosition === 'top' ? 'row' : 'column';

  return (
    <DropdownMenu.Root dir="ltr" onOpenChange={selectShapeTool}>
      <DropdownMenu.Trigger dir="ltr" asChild id="TD-PrimaryTools-Shapes">
        <ToolButton
          disabled={isActive && app.shiftKey} // otherwise this continuously opens and closes on "SpacePanning"
          variant="primary"
          onDoubleClick={handleDoubleClick}
          isToolLocked={isActive && isToolLocked}
          isActive={isActive}
          onKeyDown={handleKeyDown}
        >
          {shapeShapeIcons[lastActiveTool]}
        </ToolButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild side={contentSide} sideOffset={12}>
        <Panel side="center" style={{ flexDirection: panelStyle }}>
          {shapeShapes.map((shape, i) => (
            <Tooltip key={shape} label={shape} kbd={(4 + i).toString()} id={`TD-PrimaryTools-Shapes-${shape}`}>
              <DropdownMenu.Item asChild>
                <ToolButton
                  variant="primary"
                  onClick={() => {
                    app.selectTool(shape);
                    setLastActiveTool(shape);
                  }}
                >
                  {shapeShapeIcons[shape]}
                </ToolButton>
              </DropdownMenu.Item>
            </Tooltip>
          ))}
        </Panel>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});