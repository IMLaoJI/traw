import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import SvgGridView from "../../icons/grid-view";
import SvgAdd from "../../icons/add";
import SlideListItem, { SlideListItemState } from "./SlideListItem";

interface SlideListProps {
  canAddSlide: boolean;
  handleAddSlide: () => void;
  handleGridView: () => void;
}
const SlideList = ({
  canAddSlide,
  handleAddSlide,
  handleGridView,
}: SlideListProps) => {
  const app = useTrawApp();
  const state = app.useSlidesStore();
  const { document, appState } = state;
  const { currentPageId } = appState;
  const pages = document.pages;

  const viewerCount = 3;
  const selectState = SlideListItemState.DEFAULT;

  return (
    <div className="flex flex-row gap-3 overflow-hidden">
      <div className="flex flex-col justify-between">
        <button
          className="flex items-center justify-center bg-traw-purple w-8 h-8 rounded-md text-white
      disabled:bg-black/[.12] disabled:text-black/[.26]
      "
          disabled={!canAddSlide}
          onClick={handleAddSlide}
        >
          <SvgAdd className="fill-current w-2 h-2" />
        </button>
        <button
          className="flex items-center justify-center bg-traw-purple w-8 h-8 rounded-md text-white"
          onClick={handleGridView}
        >
          <SvgGridView className="fill-current w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-3">
          {Object.values(pages).map((page, index) => (
            <SlideListItem
              key={page.id}
              index={index + 1}
              page={page}
              viewerCount={viewerCount}
              selectState={
                page.id === currentPageId
                  ? SlideListItemState.SELECTED
                  : selectState
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideList;
