import SvgEraser from "../../../icons/eraser";
import React, { Fragment } from "react";
import { Tool } from ".";

export const info = {
  type: "ERASE",
  Icon: SvgEraser,
  cursor: "url(/cursor/erasor.cur) 10 10, auto",
  label: "Eraser (E or 5)",
  shortcut: ["E", 5],
};

const Eraser = () => {
  return <Fragment />;
};

export default Eraser;
