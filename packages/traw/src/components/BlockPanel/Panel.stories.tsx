import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { BlockPanel } from '.';

export default {
  title: 'Traw/BlockPanel',
  component: BlockPanel,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof BlockPanel>;

const Template: ComponentStory<typeof BlockPanel> = (args) => <BlockPanel {...args} />;
export const Default = Template.bind({});

Default.args = {};
