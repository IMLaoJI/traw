import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TrawContext } from "../../hooks/useTrawApp";
import { TrawApp } from "../../state/TrawApp";
import { Slide } from "./";

export default {
  title: "Traw/Slide",
  component: Slide,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Slide>;

const trawApp = new TrawApp("id", {});

const Template: ComponentStory<typeof Slide> = () => (
  <TrawContext.Provider value={trawApp}>
    <Slide />;
  </TrawContext.Provider>
);
export const Default = Template.bind({});

Default.args = {};
