import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Panel } from './';

export default {
  title: 'Traw/Panel',
  component: Panel,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;
export const Default = Template.bind({});

Default.args = {};
