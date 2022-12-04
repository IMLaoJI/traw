import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Room from "./Room";

export default {
  title: "Traw/Header/Room",
  component: Room,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Room>;

const Template: ComponentStory<typeof Room> = (props) => <Room {...props} />;
export const Default = Template.bind({});

Default.args = {
  inCallparticipants: [],
  outCallparticipants: [<div key={1} />, <div key={2} />],
  isBrowser: true,
  isMicMuted: false,
  isInCall: false,
  isConnecting: false,
  canJoinCall: true,
};
