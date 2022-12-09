import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ParticipantGroup from './ParticipantGroup';
import Participant, { ParticipantProps } from './Participant';
import { Default as ParticipantStory } from './Participant.stories';
import ParticipantName from './ParticipantName';

export default {
  title: 'Traw/Header/ParticipantGroup',
  component: ParticipantGroup,
  argTypes: {},
  args: {
    showings: [
      <Participant key={1} {...(ParticipantStory.args as ParticipantProps)} />,
      <Participant key={2} {...(ParticipantStory.args as ParticipantProps)} />,
      <Participant key={3} {...(ParticipantStory.args as ParticipantProps)} />,
      <Participant key={4} {...(ParticipantStory.args as ParticipantProps)} />,
      <Participant key={5} {...(ParticipantStory.args as ParticipantProps)} />,
    ],
    hidings: [
      <>
        <Participant {...(ParticipantStory.args as ParticipantProps)} />
        <ParticipantName username="John Doe" />
      </>,
    ],
  },
} as ComponentMeta<typeof ParticipantGroup>;

const Template: ComponentStory<typeof ParticipantGroup> = (props) => <ParticipantGroup {...props} />;
export const Default = Template.bind({});
