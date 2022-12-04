import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import InviteParticipant from "./InviteParticipant";

export default {
  title: "Traw/Header/InviteParticipant",
  component: InviteParticipant,
  argTypes: {
    handleInviteRequest: {
      action: "invite request",
    },
  },
} as ComponentMeta<typeof InviteParticipant>;

const Template: ComponentStory<typeof InviteParticipant> = (props) => (
  <InviteParticipant {...props} />
);
export const Default = Template.bind({});
Default.args = {
  excludeIds: ["userId"],
};
