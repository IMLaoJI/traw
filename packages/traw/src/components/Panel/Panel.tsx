import React from "react";

interface PanelProps {
  handlePlayClick: () => void;
}

const Panel = ({ handlePlayClick }: PanelProps) => {
  return (
    <div className="relative">
      <div className="flex flex-col h-full shadow-3xl items-center rounded-2xl  bg-white  w-[269px] p-2 ">
        <div className="absolute left-0 right-0 top-0 bottom-0 p-2 flex flex-col ">
          {/* Header */}
          <header className="flex pt-2 w-full gap-3">
            <button
              className="text-traw-purple text-xs pl-3"
              onClick={handlePlayClick}
            >
              재생
            </button>
            <div className="text-traw-grey-dark text-xs">
              00:00:00 / 00:00:00
            </div>
          </header>
          {/* Body */}
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
          {/* Footer */}
          <footer className="">Footer</footer>
        </div>
      </div>
    </div>
  );
};

export { Panel };
