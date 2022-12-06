import React from "react";
import PanelFooter from "./PanelFooter";
import PanelHeader from "./PanelHeader";

interface PanelProps {
  handlePlayClick: () => void;
}

const Panel = ({ handlePlayClick }: PanelProps) => {
  return (
    <div className="relative">
      <div className="flex flex-col h-full shadow-3xl items-center   bg-traw-sky  w-[269px] p-2 ">
        <div className="absolute left-0 right-0 top-0 bottom-0 p-2 flex flex-col ">
          <PanelHeader handlePlayClick={handlePlayClick} />
          <div className="flex flex-col  mt-3 flex-[2_2_auto] w-full overflow-y-auto min-h-0 pl-3">
            <ul className="">
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
              <li>Hello World</li>
            </ul>
          </div>
          <PanelFooter />
        </div>
      </div>
    </div>
  );
};

export { Panel };
