import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Room from './Room';
import { OTHERS, MY_SELF } from './testData';

export default {
  title: 'Traw/Header/Room',
  component: Room,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Room>;

const Template: ComponentStory<typeof Room> = (props) => <Room {...props} />;
export const Default = Template.bind({});

Default.args = {
  inCallparticipants: [],
  outCallparticipants: OTHERS,
  isBrowser: true,
  isMicMuted: false,
  isInCall: false,
  isConnecting: false,
  canJoinCall: true,
};

export const InCall = Template.bind({});
InCall.args = {
  inCallparticipants: [...OTHERS, MY_SELF],
  outCallparticipants: [],
  isBrowser: true,
  isMicMuted: false,
  isInCall: false,
  isConnecting: false,
  canJoinCall: true,
};
