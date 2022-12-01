import React from "react";
import { Tldraw } from "@tldraw/tldraw";

const Slide = () => {
  return (
    <div className="flex flex-1 flex-row items-center p-3 justify-center">
      <div className="w-full aspect-video rounded-2xl shadow-3xl relative">
        <div>
          <Tldraw />
        </div>
      </div>
    </div>
  );
};

export { Slide };
