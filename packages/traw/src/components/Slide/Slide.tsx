import React, { useCallback, useEffect } from "react";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../constants";
import { useTrawApp } from "../../hooks/useTrawApp";
import ToolBox from "../ToolBox";
import { Tool } from "../ToolBox/tools";

import { SlideItem } from "./SlideItem";
import SlideList from "./SlideList";

const Slide = () => {
  const app = useTrawApp();

  const handleAddSlide = () => {
    app.createSlide();
  };

  return (
    <div className="flex flex-1 items-center flex-col p-2">
      <div className="flex w-full bg-white rounded-2xl items-center px-4 mb-2 basis-[117px] pb-4 pt-4 ">
        <SlideList
          canAddSlide={true}
          handleAddSlide={handleAddSlide}
          handleGridView={console.log}
        />
      </div>

      <SlideItem />

      <div className="flex basis-[56px]">
        <ToolBox
          currentTool={Tool.SELECTOR}
          isUndoable={true}
          isRedoable={true}
          selectTool={console.log}
          handleUndo={console.log}
          handleRedo={console.log}
        />
      </div>
    </div>
  );
};

export { Slide };
