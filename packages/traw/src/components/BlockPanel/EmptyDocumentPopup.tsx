import React from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import EmptyContents from './EmptyContents';

interface EmptyDocumentPopupProps {
  popupContents: React.ReactNode;
  closeEmptyDocumentPopup: () => void;
}

const EmptyDocumentPopup = ({ popupContents, closeEmptyDocumentPopup }: EmptyDocumentPopupProps) => {
  return (
    <div className="flex flex-col">
      <button onClick={closeEmptyDocumentPopup} className="ml-auto text-traw-grey-100">
        <Cross2Icon />
      </button>
      <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
        <EmptyContents />
      </div>
      <div className="flex items-center justify-center ">{popupContents}</div>
    </div>
  );
};

export default EmptyDocumentPopup;
