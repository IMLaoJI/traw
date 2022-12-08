import React from "react";
import BlockItem from "./BlockItem";
import PanelFooter from "./PanelFooter";
import PanelHeader from "./PanelHeader";

interface PanelProps {
  handlePlayClick: () => void;
}

const Panel = ({ handlePlayClick }: PanelProps) => {
  return (
    <div className="relative w-full ">
      <div className="flex flex-col w-full sm:w-[269px] h-full items-center bg-white rounded-2xl shadow-[0_10px_60px_rgba(189,188,249,0.5)]">
        <div className="absolute left-0 right-0 top-0 bottom-0 p-2 flex flex-col ">
          <PanelHeader handlePlayClick={handlePlayClick} />
          <div className="flex flex-col  mt-3 flex-[2_2_auto] w-full overflow-y-auto min-h-0 px-2">
            <ul className="">
              <BlockItem
                userName="userName"
                date="오전 10:00"
                blockText="동구밖 과수원길 아카시아 꽃이 활짝폈네 "
                isVoiceBlock={false}
                handlePlayClick={handlePlayClick}
              />
            </ul>
          </div>
          <PanelFooter onCreate={console.log} />
        </div>
      </div>
    </div>
  );
};

export { Panel };
