import { TDShapeType } from "@tldraw/tldraw";
import SvgPencil from "../../../icons/pencil";
import { TrawToolInfo } from "../../../types";

export const info: TrawToolInfo = {
  type: TDShapeType.Draw,
  Icon: SvgPencil,
  label: "Drawing (B or 2)",
  shortcut: ["B", 2],
};
