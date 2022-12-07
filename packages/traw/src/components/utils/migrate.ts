import { AlignStyle, FontSize } from "@tldraw/tldraw";
import { Record } from "../../types";

enum LegacyColorType {
  PURPLE = "PURPLE",
  RED = "RED",
  ORANGE = "ORANGE",
  GREEN = "GREEN",
  BLUE = "BLUE",
  GREY = "GREY",
}

const ColorMap: { [key in LegacyColorType]: string } = {
  [LegacyColorType.PURPLE]: "violet",
  [LegacyColorType.RED]: "red",
  [LegacyColorType.ORANGE]: "orange",
  [LegacyColorType.GREEN]: "green",
  [LegacyColorType.BLUE]: "blue",
  [LegacyColorType.GREY]: "gray",
};

export const migrateRecords = (records: Record[]): Record[] => {
  const result: Record[] = [];
  records.forEach((record) => {
    let newRecord: Record | undefined;
    switch (record.type) {
      case "ADD_SLIDE":
        newRecord = {
          ...record,
          type: "create_page",
          data: {
            id: record.data.id,
          },
        };
        break;
      case "SELECT_SLIDE":
        newRecord = {
          ...record,
          type: "change_page",
          data: {
            id: record.data.id,
          },
        };
        break;
      case "ADD":
        const { type, assetId, data } = record.data;
        switch (type) {
          case "TEXT":
            newRecord = {
              ...record,
              type: "edit",
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    type: "text",
                    name: "Text",
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [data.x, data.y],
                    rotation: 0,
                    text: data.text,
                    style: {
                      color: "black",
                      size:
                        data.fontSize > 50
                          ? FontSize.Large
                          : data.fontSize > 30
                          ? FontSize.Medium
                          : FontSize.Small,
                      isFilled: false,
                      dash: "draw",
                      scale: 1,
                      font: "sans",
                      textAlign:
                        data.align === "left"
                          ? AlignStyle.Start
                          : AlignStyle.Middle,
                    },
                  },
                },
              },
            };
            break;
          case "PATH":
            const newPositions: number[][] = [];
            for (let i = 0; i < data.positions.length; i += 3) {
              newPositions.push([
                data.positions[i] - data.positions[0],
                data.positions[i + 1] - data.positions[1],
                0.5,
              ]);
            }

            newRecord = {
              ...record,
              type: "create_draw",
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    type: "draw",
                    name: "Draw",
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [data.positions[0], data.positions[1]],
                    rotation: 0,
                    style: {
                      color: ColorMap[data.color],
                      size: "small",
                      isFilled: false,
                      dash: "draw",
                      scale: 1,
                    },
                    points: newPositions,
                    isComplete: true,
                  },
                },
              },
            };
            break;
          default:
            break;
        }
        break;
      default:
        return false;
    }
    if (newRecord) {
      result.push(newRecord);
    }
  });

  return result;
};
