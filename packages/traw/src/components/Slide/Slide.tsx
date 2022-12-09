import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import ToolBox from "../ToolBox";

import { SlideItem } from "./SlideItem";
import SlideList from "./SlideList";

const Slide = () => {
  const app = useTrawApp();
  const { appState } = app.useSlidesStore();
  const { activeTool } = appState;

  const handleAddSlide = () => {
    app.createSlide();
  };

  return (
    <div className="flex flex-1 items-center flex-col pl-2 pb-2 pr-2.5 pt-2.5">
      <div className="flex w-full bg-white rounded-2xl items-center px-3 sm:px-4 mb-2 basis-[76px] sm:basis-[117px] shadow-[0_10px_50px_rgba(189,188,249,0.5)]">
        <SlideList
          canAddSlide={true}
          handleAddSlide={handleAddSlide}
          handleGridView={console.log}
        />
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-1 w-full items-center ">
            <div className="flex-1">
              <SlideItem />
            </div>
          </div>

          <div className="flex basis-[56px] ">
            <ToolBox
              currentTool={activeTool}
              isUndoable={true}
              isRedoable={true}
              selectTool={console.log}
              handleUndo={console.log}
              handleRedo={console.log}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Slide };
