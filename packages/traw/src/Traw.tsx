import React from "react";
import { Header } from "./components/Header";
import { Panel } from "./components/Panel";
import { Slide } from "./components/Slide";
import "./index.css";

export interface TrawProps {
  id?: string;
}

const Traw = ({ id }: TrawProps) => {
  console.log(id);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="h-14">
        <Header />
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex-1 flex">
          <Slide />
        </div>
        <div className="flex-0 flex">
          <Panel />
        </div>
      </div>
    </div>
  );
};

export { Traw };
