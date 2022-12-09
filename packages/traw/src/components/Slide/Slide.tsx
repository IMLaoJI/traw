import React, { useState } from 'react';
import { useTrawApp } from '../../hooks/useTrawApp';
import ToolBox from '../ToolBox';
import SlideGridView from './SlideGridView';

import { SlideItem } from './SlideItem';
import SlideList from './SlideList';

const Slide = () => {
  const [isGridView, setIsGridView] = useState(false);

  const app = useTrawApp();
  const { appState, document } = app.useSlidesStore();
  const { activeTool, currentPageId } = appState;

  const pages = document.pages;

  const handleAddSlide = () => {
    app.createSlide();
  };

  const handleToggleGridView = () => {
    setIsGridView(!isGridView);
  };

  const handleSelectSlide = (slideId: string) => {
    app.selectSlide(slideId);
    setIsGridView(false);
  };

  return (
    <div className="flex flex-1 items-center flex-col ml-2 mr-2.5 mb-2  mt-2.5 relative">
      {isGridView && (
        <div className="flex w-full h-full absolute overflow-auto z-[102]  ">
          <SlideGridView
            pages={pages}
            close={handleToggleGridView}
            selectSlide={handleSelectSlide}
            currentPageId={currentPageId}
          />
        </div>
      )}
      <div className="flex w-full bg-white rounded-2xl items-center px-3 sm:px-4 mb-2 basis-[76px] sm:basis-[117px] shadow-[0_10px_50px_rgba(189,188,249,0.5)]">
        <SlideList canAddSlide={true} handleAddSlide={handleAddSlide} handleGridView={handleToggleGridView} />
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
