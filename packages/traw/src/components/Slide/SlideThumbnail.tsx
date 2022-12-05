import { Renderer } from "@tldraw/core";
import { shapeUtils, TDPage } from "@tldraw/tldraw";
import React from "react";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../constants";
import { useTrawApp } from "../../hooks/useTrawApp";

interface SlideThumbnailProps {
  page: TDPage;
}

const SLideThumbnail = ({ page }: SlideThumbnailProps) => {
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

export default SLideThumbnail;
