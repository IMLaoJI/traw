import React from "react";
import { useTrawApp } from "../../hooks/useTrawApp";
import { TDPage, shapeUtils, TDDocument } from "@tldraw/tldraw";
import { TLPageState, Renderer } from "@tldraw/core";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../constants";

const SlideThumbnail = ({ page }: { page: TDPage }) => {
  const app = useTrawApp();
  const state = app.useStore();

  const { document, settings, appState, room } = state;
  const theme = React.useMemo(() => {
    const { selectByContain } = appState;
    const { isDarkMode, isCadSelectMode } = settings;

    if (isDarkMode) {
      const brushBase = isCadSelectMode
        ? selectByContain
          ? "69, 155, 255"
          : "105, 209, 73"
        : "180, 180, 180";
      return {
        brushFill: `rgba(${brushBase}, ${isCadSelectMode ? 0.08 : 0.05})`,
        brushStroke: `rgba(${brushBase}, ${isCadSelectMode ? 0.5 : 0.25})`,
        brushDashStroke: `rgba(${brushBase}, .6)`,
        selected: "rgba(38, 150, 255, 1.000)",
        selectFill: "rgba(38, 150, 255, 0.05)",
        background: "#212529",
        foreground: "#49555f",
      };
    }

    const brushBase = isCadSelectMode
      ? selectByContain
        ? "0, 89, 242"
        : "51, 163, 23"
      : "0,0,0";

    return {
      brushFill: `rgba(${brushBase}, ${isCadSelectMode ? 0.08 : 0.05})`,
      brushStroke: `rgba(${brushBase}, ${isCadSelectMode ? 0.4 : 0.25})`,
      brushDashStroke: `rgba(${brushBase}, .6)`,
    };
  }, [appState, settings]);

  const meta = React.useMemo(() => {
    return { isDarkMode: settings.isDarkMode };
  }, [settings.isDarkMode]);

  return (
    <Renderer
      id={document.id}
      shapeUtils={shapeUtils}
      page={page}
      hideBounds={true}
      theme={theme}
      meta={meta}
      pageState={{
        ...document.pageStates[page.id],
        camera: {
          point: [SLIDE_WIDTH / 2, SLIDE_HEIGHT / 2],
          zoom: 160 / SLIDE_WIDTH,
        },
      }}
      assets={document.assets}
    />
  );
};

const SlideList = () => {
  const app = useTrawApp();

  const state = app.useStore();

  const { document, appState } = state;

  const pages = document.pages;
  return (
    <div className="flex flex-row gap-3 overflow-hidden">
      <div className="flex flex-col justify-between">
        <button className="bg-traw-purple w-8 h-8 rounded-md text-white">
          +
        </button>
        <button className="bg-traw-purple w-8 h-8 rounded-md text-white">
          +
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-3">
          {Object.values(pages).map((page) => {
            return (
              <div
                key={page.id}
                className={`w-36 aspect-video rounded-2xl relative flex-auto flex-shrink-0 flex-grow-0`}
              >
                <SlideThumbnail page={page} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SlideList;
