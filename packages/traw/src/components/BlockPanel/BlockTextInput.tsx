import { useTrawApp } from 'hooks';
import React, { useState } from 'react';

interface BlockTextInputProps {
  blockId: string;
  originText: string;
  endEditMode: () => void;
}

const BlockTextInput = ({ blockId, originText, endEditMode }: BlockTextInputProps) => {
  const trawApp = useTrawApp();
  const [newValue, setNewValue] = useState(originText);

  const handleBlockTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleBlockTextBlur = () => {
    endEditMode();
    trawApp.editBlock(blockId, newValue);
  };

  return (
    <input
      className="text-sm rounded-md px-0.5 transition-colors bg-traw-grey-50 w-full"
      value={newValue}
      onChange={handleBlockTextChange}
      onBlur={handleBlockTextBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleBlockTextBlur();
        }
      }}
      autoFocus
    />
  );
};

export default BlockTextInput;
