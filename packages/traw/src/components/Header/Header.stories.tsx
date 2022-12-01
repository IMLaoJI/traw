import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Header } from './';

export default {
  title: 'Traw/Header',
  component: Header,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;
export const Default = Template.bind({});

Default.args = {};
