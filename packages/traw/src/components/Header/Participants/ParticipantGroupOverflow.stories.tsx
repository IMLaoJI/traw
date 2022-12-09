import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import ParticipantGroupOverflow from './ParticipantGroupOverflow';
import Participant, { ParticipantProps } from './Participant';
import { Default as ParticipantStory } from './Participant.stories';
import ParticipantName from './ParticipantName';

export default {
  title: 'Traw/Header/ParticipantGroupOverflow',
  component: ParticipantGroupOverflow,
  argTypes: {},
  args: {
    children: [
      <>
        <Participant key={1} {...(ParticipantStory.args as ParticipantProps)} />
        <ParticipantName username="John Doe" />
      </>,
      <>
        <Participant key={2} {...(ParticipantStory.args as ParticipantProps)} />
        <ParticipantName username="Jack Miller" />
      </>,
      <>
        <Participant key={3} {...(ParticipantStory.args as ParticipantProps)} />
        <ParticipantName username="Bob Smith" />
      </>,
    ],
  },
} as ComponentMeta<typeof ParticipantGroupOverflow>;

const Template: ComponentStory<typeof ParticipantGroupOverflow> = (props) => <ParticipantGroupOverflow {...props} />;
export const Default = Template.bind({});

Default.args = {};
