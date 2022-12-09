import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Traw } from './Traw';
import { Record } from './types';

export default {
  title: 'Traw/Traw',
  component: Traw,
  argTypes: {},
  args: {},
} as ComponentMeta<typeof Traw>;

const Template: ComponentStory<typeof Traw> = () => {
  const onAddRecord = (record: any) => {
    console.log(record);
  };

  return (
    <div className="h-screen flex -m-4">
      <Traw onAddRecord={onAddRecord} />
    </div>
  );
};
export const Default = Template.bind({});

Default.args = {};

const SyncTemplate: ComponentStory<typeof Traw> = () => {
  const [records, setRecords] = React.useState<Record[]>([]);

  const onAddRecord = (record: any) => {
    setRecords((prev) => [...prev, record]);
  };

  return (
    <div className="h-screen flex -m-4">
      <Traw onAddRecord={onAddRecord} />
      <Traw records={records} />
    </div>
  );
};

export const Sync = SyncTemplate.bind({});
Sync.args = {};
