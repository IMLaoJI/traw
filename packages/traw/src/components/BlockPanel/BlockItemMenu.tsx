import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { DMContent, DMItem } from 'components/Primitives/DropdownMenu';
import { ToolButton } from 'components/Primitives/ToolButton';
import React from 'react';

interface BlockItemMenuProps {
  handleToggleEditMode: () => void;
  handleDeleteBlock: () => void;
}

const BlockItemMenu = ({ handleToggleEditMode, handleDeleteBlock }: BlockItemMenuProps) => {
  return (
    <DropdownMenu.Root modal={false} dir="ltr">
      <DropdownMenu.Trigger asChild className="flex flex-shrink-0 ">
        <ToolButton variant="icon">
          <DotsVerticalIcon className="w-4 h-4 text-traw-grey-100 " />
        </ToolButton>
      </DropdownMenu.Trigger>
      <DMContent side="bottom" align="center">
        <DMItem onSelect={handleToggleEditMode} id="edit-block">
          Edit Block
        </DMItem>
        <DMItem onSelect={handleDeleteBlock} id="delete-block">
          Delete Block
        </DMItem>
      </DMContent>
    </DropdownMenu.Root>
  );
};

export default BlockItemMenu;
