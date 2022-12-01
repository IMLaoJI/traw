import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Slide } from './';

export default {
  title: 'Traw/Slide',
  component: Slide,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Slide>;

const Template: ComponentStory<typeof Slide> = () => <Slide />;
export const Default = Template.bind({});

Default.args = {};
