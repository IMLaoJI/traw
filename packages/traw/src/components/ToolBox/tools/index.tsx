import { info as Eraser } from './Eraser';
import { info as Files } from './Files';
import { info as Path } from './Path';
import { info as Shape } from './Shape';
import { info as Selector } from './Selector';
import { info as Text } from './Text';
import { TrawToolInfo } from '../../../types';

export const getSlideToolMenu = (isMobile: boolean) =>
  isMobile ? [Path, Shape, Files] : [Selector, Path, Text, Shape, Eraser, Files];

export const toolMenus: TrawToolInfo[] = [Selector, Path, Text, Shape, Eraser, Files];
