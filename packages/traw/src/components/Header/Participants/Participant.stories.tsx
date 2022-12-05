import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Participant from "./Participant";

export default {
  title: "Traw/Header/Participant",
  component: Participant,
  argTypes: {
    followUser: {
      action: "followUser",
    },
  },
  args: {
    followUser: (userId: string) => {
      console.log(userId);
    },
  },
} as ComponentMeta<typeof Participant>;

const Template: ComponentStory<typeof Participant> = (props) => (
  <Participant {...props} />
);
export const Default = Template.bind({});

Default.args = {
  userId: "userId",
  color: "purple",
  isInCall: false,
  isMuted: false,
  isAudience: false,
};
