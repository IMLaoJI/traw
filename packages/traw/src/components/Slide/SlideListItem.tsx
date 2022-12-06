import { TDPage } from "@tldraw/tldraw";
import classNames from "classnames";
import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import SvgViewer from "../../icons/viewer";
import SlideThumbnail from "./SlideThumbnail";

export enum SlideListItemState {
  DEFAULT = "DEFAULT",
  TARGETED = "TARGETED",
  SELECTED = "SELECTED",
}

interface SlideListItemProps {
  page: TDPage;
  index: number;
  viewerCount: number;
  selectState: SlideListItemState;
}

const SlideListItem = ({
  page,
  index,
  viewerCount,
  selectState,
}: SlideListItemProps) => {
  const app = useTrawApp();

  const handleSelectSlide = () => {
    app.selectSlide(page.id);
  };

  return (
    <div
      key={page.id}
      onClick={handleSelectSlide}
      className={classNames(
        `w-[133px] outline-1 aspect-video rounded-2xl relative flex-auto flex-shrink-0 flex-grow-0 cursor-pointer`,
        {
          "outline-black outline-offset-[-1px] ":
            selectState === SlideListItemState.DEFAULT,
          "outline-traw-purple ": selectState === SlideListItemState.SELECTED,
          "outline-traw-grey ": selectState === SlideListItemState.TARGETED,
        }
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-[101] flex flex-col justify-between">
        <div
          className={classNames(
            "flex items-center justify-between ml-auto w-14 rounded-bl-[10px] rounded-tr-[10px] text-right text-[10px] py-1 px-2 bg-traw-grey-50 text-traw-grey-100",
            {
              "bg-traw-purple text-white ":
                selectState === SlideListItemState.SELECTED,
              "bg-traw-grey-50 text-traw-grey-100 ":
                selectState === SlideListItemState.DEFAULT,
            }
          )}
        >
          <SvgViewer className="fill-current h-5 w-5" />
          {viewerCount}
        </div>
        <div className="ml-auto text-[10px] text-traw-grey-100 pr-2 pb-1">
          {index}
        </div>
      </div>
      <SlideThumbnail page={page} />
    </div>
  );
};

export default SlideListItem;
