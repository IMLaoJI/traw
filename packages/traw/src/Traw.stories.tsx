import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect } from "react";
import { TrawApp } from "./state/TrawApp";

import { Traw } from "./Traw";
import { Record } from "./types";

export default {
  title: "Traw/Traw",
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
  const [trawAppLeft] = React.useState<TrawApp>(new TrawApp());
  const [trawAppRight] = React.useState<TrawApp>(new TrawApp());

  useEffect(() => {
    trawAppLeft.callbacks.onRecordsCreate = (app, records) => {
      trawAppRight.addRecords(records);
    };
    trawAppRight.callbacks.onRecordsCreate = (app, records) => {
      trawAppLeft.addRecords(records);
    };
  }, [trawAppLeft, trawAppRight]);

  return (
    <div className="h-screen flex -m-4">
      <Traw app={trawAppLeft} />
      <Traw app={trawAppRight} />
    </div>
  );
};

export const Sync = SyncTemplate.bind({});
Sync.args = {};
