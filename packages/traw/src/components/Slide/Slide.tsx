import React, { useCallback, useEffect } from "react";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../constants";
import { useTrawApp } from "../../hooks/useTrawApp";
import ToolBox from "../ToolBox";
import { Tool } from "../ToolBox/tools";

import { SlideItem } from "./SlideItem";
import SlideList from "./SlideList";

const Slide = () => {
  const slideDomRef = React.useRef<HTMLDivElement>(null);
  const app = useTrawApp();
  const tldrawApp = app.useTldrawApp();

  const handleResize = useCallback(() => {
    if (!slideDomRef.current) return;
    const width = slideDomRef.current.clientWidth;
    const zoom = width / SLIDE_WIDTH;
    tldrawApp.setCamera([SLIDE_WIDTH / 2, SLIDE_HEIGHT / 2], zoom, "fixCamera");
  }, [tldrawApp]);

  useEffect(() => {
    handleResize();
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className="flex flex-1 items-center flex-col p-2">
    <div className="flex w-full bg-white rounded-2xl items-center px-4 mb-2 basis-[117px] pb-4 pt-4 ">
      <SlideList
        canAddSlide={true}
        handleAddSlide={console.log}
        handleGridView={console.log}
      />
      </div>
      <div
        className="w-full aspect-video rounded-2xl shadow-3xl relative overflow-hidden"
        ref={slideDomRef}
      >
        <SlideItem />
      </div>
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
