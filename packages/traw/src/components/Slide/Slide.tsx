import React, { useCallback, useEffect } from "react";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "../../constants";
import { useTrawApp } from "../../hooks/useTrawApp";
import { SlideItem } from "./SlideItem";

const Slide = () => {
  const slideDomRef = React.useRef<HTMLDivElement>(null);
  const app = useTrawApp();

  const handleResize = useCallback(() => {
    if (!slideDomRef.current) return;
    const width = slideDomRef.current.clientWidth;
    const zoom = width / SLIDE_WIDTH;
    app.setCamera([SLIDE_WIDTH / 2, SLIDE_HEIGHT / 2], zoom, "just");
  }, [app]);

  useEffect(() => {
    addEventListener("resize", handleResize);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div className="flex flex-1 items-center p-3 justify-center flex-col">
      <div className="h-10">slidePage</div>
      <div
        className="w-full aspect-video rounded-2xl shadow-3xl relative overflow-hidden"
        ref={slideDomRef}
      >
        <SlideItem />
      </div>
      <div className="h-4">tool</div>
    </div>
  );
};

export { Slide };
