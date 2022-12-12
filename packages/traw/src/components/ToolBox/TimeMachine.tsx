import React, { Fragment } from 'react';
import SvgRedo from '../../icons/redo';
import SvgUndo from '../../icons/undo';

export interface TimeMachineProps {
  isUndoable: boolean;
  isRedoable: boolean;
  handleUndo: () => void;
  handleRedo: () => void;
}

export const TimeMachine = ({ isUndoable, handleUndo, isRedoable, handleRedo }: TimeMachineProps) => {
  // const ctrlOrCmd = isMacOs ? "Cmd" : "Ctrl";
  // const undoTooltip = isUndoable ? `Undo (${ctrlOrCmd} + Z)` : "";
  // const redoTooltip = isRedoable ? `Redo (${ctrlOrCmd} + Shift + Z)` : "";

  return (
    <Fragment>
      <button
        disabled={!isUndoable}
        onClick={handleUndo}
        className="rounded-full w-6 h-6 flex items-center justify-center ml-2 mr-[2px] text-traw-grey hover:bg-black/[.04] disabled:text-black/[.26]"
      >
        <SvgUndo className=" w-4 h-4" fill="currentColor" />
      </button>
      <button
        disabled={!isRedoable}
        onClick={handleRedo}
        className="rounded-full w-6 h-6 flex items-center justify-center  text-traw-grey hover:bg-black/[.04] disabled:text-black/[.26]"
      >
        <SvgRedo className="w-4 h-4" fill="currentColor" />
      </button>
    </Fragment>
  );
};

export default TimeMachine;
