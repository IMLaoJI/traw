import React from "react";
import { SlideItem } from "./SlideItem";

const Slide = () => {
  return (
    <div className="flex flex-1 items-center p-3 justify-center flex-col">
      <div className="h-10">slidePage</div>
      <div className="w-full aspect-video rounded-2xl shadow-3xl relative overflow-hidden">
        <SlideItem />
      </div>
      <div className="h-4">tool</div>
    </div>
  );
};

export { Slide };
