import SvgEraser from '../../../icons/eraser';
import React, { Fragment } from 'react';
import { TrawToolInfo } from '../../../types';

export const info: TrawToolInfo = {
  type: 'erase',
  Icon: SvgEraser,
  label: 'Eraser (E or 5)',
  shortcut: ['E', 5],
};

const Eraser = () => {
  return <Fragment />;
};

export default Eraser;
