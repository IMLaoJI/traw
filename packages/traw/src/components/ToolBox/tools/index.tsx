import { info as Eraser } from "./Eraser";
import { info as Files } from "./Files";
import { info as Path } from "./Path";
import { info as Shape } from "./Shape";
import { info as Selector } from "./Selector";
import { info as Text } from "./Text";

export enum Tool {
  SELECTOR = "SELECTOR",
  ERASE = "ERASE",
  PEN = "PEN",
  TEXT = "TEXT",
  FILES = "FILES",
  SHAPE = "SHAPE",
}

export const getSlideToolMenu = (isMobile: boolean) =>
  isMobile
    ? [Path, Shape, Files]
    : [Selector, Path, Text, Shape, Eraser, Files];

export const toolMenus = [Selector, Path, Text, Shape, Eraser, Files];

export const tools: {
  [key in Tool]: {
    type: string;
    Icon: any;
    menu?: any[];
    cursor: string;
    onClick?: () => void;
    onSelect?: () => void;
    onUnselect?: () => void;
    IconWrapper?: React.ReactNode;
    enableAssetHandler?: boolean;
  };
} = {
  [Tool.SELECTOR]: Selector,
  [Tool.PEN]: Path,
  [Tool.SHAPE]: Path,
  [Tool.ERASE]: Eraser,
  [Tool.TEXT]: Text,
  [Tool.FILES]: Files,
};
