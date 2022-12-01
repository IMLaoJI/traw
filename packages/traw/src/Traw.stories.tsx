import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Traw } from './Traw';

export default {
  title: 'Traw/Traw',
  component: Traw,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Traw>;

const Template: ComponentStory<typeof Traw> = () => (
  <div className="h-screen flex -m-4">
    <Traw />
  </div>
);
export const Default = Template.bind({});

Default.args = {};
