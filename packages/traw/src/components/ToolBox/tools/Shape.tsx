import SvgShape from "../../../icons/shape";
import { TDShapeType } from "@tldraw/tldraw";
import { TrawToolInfo } from "../../../types";

export const info: TrawToolInfo = {
  type: TDShapeType.Rectangle,
  Icon: SvgShape,
  label: "Rect (R or 4)",
  shortcut: ["R", 4],
};
