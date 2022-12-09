import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { TrawContext } from '../../hooks/useTrawApp';
import { TrawApp } from '../../state/TrawApp';
import SlideList from './SlideList';

export default {
  title: 'Traw/Slide/SlideList',
  component: SlideList,
  argTypes: {},
} as ComponentMeta<typeof SlideList>;

const trawApp = new TrawApp();

const Template: ComponentStory<typeof SlideList> = (props) => (
  <TrawContext.Provider value={trawApp}>
    <SlideList {...props} />
  </TrawContext.Provider>
);
export const Default = Template.bind({});

Default.args = {
  canAddSlide: true,
};
