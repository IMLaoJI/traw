import React, { useState } from "react";

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

  return (
    <footer className="mt-2 mb-2 ">
      <input
        className="w-full rounded-full border border-traw-purple indent-1 text-traw-grey-dark text-xs p-2 focus-visible:outline-0"
        placeholder="Enter messages here."
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </footer>
  );
};
export default PanelFooter;
