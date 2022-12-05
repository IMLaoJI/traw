import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ToolBox from ".";
import { Tool } from "./tools";

export default {
  title: "Traw/ToolBox",
  component: ToolBox,
  argTypes: {
    selectTool: {
      action: "tool clicked",
    },
    handleUndo: {
      action: "undo clicked",
    },
    handleRedo: {
      action: "redo clicked",
    },
  },
} as ComponentMeta<typeof ToolBox>;

const Template: ComponentStory<typeof ToolBox> = (props) => (
  <ToolBox {...props} />
);
export const Default = Template.bind({});

Default.args = {
  currentTool: Tool.SELECTOR,
  isUndoable: true,
  isRedoable: true,
};
