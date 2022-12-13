import React, { memo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import TimeMachine from './TimeMachine';
import ToolButton from './ToolButton';
import { toolMenus } from './tools';
import { TDToolType } from '@tldraw/tldraw';

export interface ToolBoxProps {
  currentTool: TDToolType;
  isUndoable: boolean;
  isRedoable: boolean;
  selectTool: (tool: any) => void;
  handleUndo: () => void;
  handleRedo: () => void;
}

export const ToolBox = memo(({ isUndoable, handleUndo, isRedoable, handleRedo, currentTool }: ToolBoxProps) => {
  useHotkeys(
    `cmd+z, ctrl+z`,
    (e) => {
      e.preventDefault();
      handleUndo();
    },
    [handleUndo],
  );

  useHotkeys(
    `cmd+shift+z, ctrl+shift+z`,
    (e) => {
      e.preventDefault();
      handleRedo();
    },
    [handleRedo],
  );

  return (
    <div className="flex bg-white rounded-full py-1 px-3  h-fit w-fit items-center ">
      {toolMenus.map((Tool, index) => (
        <ToolButton Tool={Tool} key={index} selected={currentTool === Tool.type} />
      ))}
      <hr className="my-1 border-r h-auto border-traw-grey border-solid rounded-none self-stretch" />

      <TimeMachine isUndoable={isUndoable} isRedoable={isRedoable} handleUndo={handleUndo} handleRedo={handleRedo} />
    </div>
  );
});

ToolBox.displayName = 'ToolBox';

export default ToolBox;
