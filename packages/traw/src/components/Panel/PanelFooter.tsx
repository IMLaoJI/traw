import React, { useState } from "react";
import SvgSend from "../../icons/send";
import classNames from "classnames";

interface PanelFooterProps {
  onCreate: (text: string) => void;
}

const PanelFooter = ({ onCreate }: PanelFooterProps) => {
  const [text, setText] = useState<string | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!text) return;
      onCreate(text);
      setText(undefined);
    }
  };

  const handleClick = () => {
    if (!text) return;
    onCreate(text);
    setText(undefined);
  };

  return (
    <footer className="mt-2 mb-2 ">
      <div className="flex align-items border rounded-full border-traw-purple p-2">
        <input
          className="w-full rounded-full  text-traw-grey-dark text-xs px-0.5 focus-visible:outline-0"
          placeholder="Enter messages here."
          value={text}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className={classNames("w-4 ", {
            "text-traw-grey-100": !text,
            "text-traw-purple": text,
          })}
          onClick={handleClick}
        >
          <SvgSend className="fill-current w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
export default PanelFooter;
