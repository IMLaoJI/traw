import { TDShapeType } from "@tldraw/tldraw";
import SvgPencil from "../../../icons/pencil";

export const info = {
  type: TDShapeType.Draw,
  Icon: SvgPencil,
  cursor: "crosshair",
  label: "Drawing (B or 2)",
  shortcut: ["B", 2],
};
