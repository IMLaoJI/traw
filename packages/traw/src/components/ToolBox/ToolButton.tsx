import * as Tooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useTrawApp } from 'hooks';
import { TrawToolInfo } from 'types';

export interface ToolButtonProps {
  Tool: TrawToolInfo;
  selected: boolean;
}

export const ToolButton = ({ Tool, selected }: ToolButtonProps) => {
  const trawApp = useTrawApp();
  const app = trawApp.useTldrawApp();

  const selectTool = () => {
    if (Tool.type !== 'file') app.selectTool(Tool.type);
  };

  useHotkeys(
    `${Tool.shortcut[0]}, ${Tool.shortcut[1]}`,
    (event) => {
      event.preventDefault();
      selectTool();
    },
    [],
  );

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className={classNames('rounded-full w-6 h-6 flex items-center justify-center mr-2 ', {
              'bg-traw-purple/[.3]': selected,
              'hover:bg-black/[.04]': !selected,
            })}
            onClick={() => {
              selectTool();
            }}
            id={Tool.type}
          >
            <Tool.Icon className="text-traw-grey w-4 h-4 " />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {Tool.label}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolButton;
