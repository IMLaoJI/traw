import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Header } from "./";
import Room, { RoomProps } from "./Room/Room";
import { Default as RoomStory } from "./Room/Room.stories";

export default {
  title: "Traw/Header",
  component: Header,
  argTypes: {},
  args: {
    title: "My Traw",
    canEdit: true,

    Room: <Room {...(RoomStory.args as RoomProps)} />,
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (props) => (
  <Header {...props} />
);
export const Default = Template.bind({});

Default.args = {};
