import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ToolBox from ".";
import { TrawContext } from "../../hooks/useTrawApp";
import { TrawApp } from "../../state/TrawApp";

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

const trawApp = new TrawApp();

const Template: ComponentStory<typeof ToolBox> = (props) => (
  <TrawContext.Provider value={trawApp}>
    <ToolBox {...props} />
  </TrawContext.Provider>
);
export const Default = Template.bind({});

Default.args = {
  currentTool: "select",
  isUndoable: true,
  isRedoable: true,
};
