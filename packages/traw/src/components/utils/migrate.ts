import { AlignStyle, FontSize, SizeStyle } from '@tldraw/tldraw';
import { Record } from '../../types';

enum LegacyColorType {
  PURPLE = 'PURPLE',
  RED = 'RED',
  ORANGE = 'ORANGE',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  GREY = 'GREY',
}

const ColorMap: { [key in LegacyColorType]: string } = {
  [LegacyColorType.PURPLE]: 'violet',
  [LegacyColorType.RED]: 'red',
  [LegacyColorType.ORANGE]: 'orange',
  [LegacyColorType.GREEN]: 'green',
  [LegacyColorType.BLUE]: 'blue',
  [LegacyColorType.GREY]: 'gray',
};

export const getAssetFileUrl = (origin: string, assetId: string) => {
  return `${'https://api.traw.io'}/documents/${origin.split('/')[0]}/records/${
    origin.split('/')[1] || assetId
  }/file/redirect`;
};

const convertFontSize = (fontSize: number) => {
  return fontSize > 50 ? FontSize.Large : fontSize > 34 ? FontSize.Medium : FontSize.Small;
};

const convertThickness = (thickness: number) => {
  return thickness >= 8 ? SizeStyle.Large : thickness >= 4 ? SizeStyle.Medium : SizeStyle.Small;
};

export const migrateRecords = (records: Record[]): Record[] => {
  const result: Record[] = [];
  const assetBoundMap: {
    [key: string]: {
      x: number;
      y: number;
      width?: number;
      height?: number;
    };
  } = {};
  records.forEach((record) => {
    let newRecord: Record | undefined;
    switch (record.type) {
      case 'ADD_SLIDE':
        newRecord = {
          ...record,
          type: 'create_page',
          data: {
            id: record.data.id,
          },
        };
        break;
      case 'SELECT_SLIDE':
        newRecord = {
          ...record,
          type: 'change_page',
          data: {
            id: record.data.id,
          },
        };
        break;
      case 'DELETE_SLIDE':
        newRecord = {
          ...record,
          type: 'delete_page',
          data: {
            id: record.data.id,
          },
        };
        break;
      case 'ADD': {
        const { type, assetId, data } = record.data;
        switch (type) {
          case 'TEXT':
            newRecord = {
              ...record,
              type: 'edit',
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    type: 'text',
                    name: 'Text',
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [data.x, data.y - data.fontSize / 2],
                    rotation: 0,
                    text: data.text,
                    style: {
                      color: 'black',
                      size: convertFontSize(data.fontSize),
                      isFilled: false,
                      dash: 'draw',
                      scale: 1,
                      font: 'sans',
                      textAlign: data.align === 'left' ? AlignStyle.Start : AlignStyle.Middle,
                    },
                  },
                },
              },
            };
            assetBoundMap[assetId] = {
              x: data.x,
              y: data.y,
            };
            break;
          case 'PATH': {
            const newPositions: number[][] = [];
            let minX = Infinity;
            let minY = Infinity;
            for (let i = 0; i < data.positions.length; i += 3) {
              const x = data.positions[i];
              const y = data.positions[i + 1];
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
            }

            for (let i = 0; i < data.positions.length; i += 3) {
              newPositions.push([data.positions[i] - minX, data.positions[i + 1] - minY, 0.5]);
            }

            newRecord = {
              ...record,
              type: 'create_draw',
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    type: 'draw',
                    name: 'Draw',
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [minX, minY],
                    rotation: 0,
                    style: {
                      color: ColorMap[data.color as LegacyColorType],
                      size: convertThickness(data.thickness),
                      isFilled: false,
                      dash: 'solid',
                      scale: 1,
                    },
                    points: newPositions,
                    isComplete: true,
                  },
                },
              },
            };
            assetBoundMap[assetId] = {
              x: data.x || 0,
              y: data.y || 0,
            };
            break;
          }
          case 'SHAPE':
            newRecord = {
              ...record,
              type: 'create',
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    type: 'rectangle',
                    name: 'Rectangle',
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [data.x - data.width / 2, data.y - data.height / 2],
                    rotation: 0,
                    size: [data.width, data.height],
                    style: {
                      color: ColorMap[data.color as LegacyColorType],
                      size: convertThickness(data.thickness),
                      isFilled: false,
                      dash: 'solid',
                      scale: 1,
                    },
                  },
                },
              },
            };
            assetBoundMap[assetId] = {
              x: data.x,
              y: data.y,
              width: data.width,
              height: data.height,
            };
            break;
          case 'IMAGE':
            newRecord = {
              ...record,
              type: 'create',
              data: {
                shapes: {
                  [assetId]: {
                    id: assetId,
                    assetId: assetId,
                    type: 'image',
                    name: 'Image',
                    parentId: record.slideId,
                    childIndex: 1,
                    point: [data.x - data.width / 2, data.y - data.height / 2],
                    rotation: 0,
                    size: [data.width, data.height],
                    style: {
                      color: 'black',
                      size: 'small',
                      isFilled: false,
                      dash: 'draw',
                      scale: 1,
                    },
                  },
                },
                assets: {
                  [assetId]: {
                    id: assetId,
                    type: 'image',
                    name: 'Image.' + data.ext,
                    src: getAssetFileUrl(record.origin, assetId),
                  },
                },
              },
            };
            assetBoundMap[assetId] = {
              x: data.x || 0,
              y: data.y || 0,
              width: data.width,
              height: data.height,
            };
            break;
          default:
            break;
        }
        break;
      }
      case 'UPDATE': {
        const { assetId, data } = record.data;
        const newData: { [key: string]: any } = {};
        if (data.text !== undefined) {
          newData['text'] = data.text;
        }
        if (data.width || data.height) {
          if (!assetBoundMap[assetId]) return false;
          newData.size = [data.width, data.height];
          newData.point = [data.x - data.width / 2, data.y - data.height / 2];
          assetBoundMap[assetId] = {
            x: data.x || 0,
            y: data.y || 0,
            width: data.width,
            height: data.height,
          };
        } else if (data.x || data.y) {
          if (!assetBoundMap[assetId]) return false;
          if (assetBoundMap[assetId].width) {
            const bound = assetBoundMap[assetId];
            newData['point'] = [data.x - (bound.width ?? 0) / 2, data.y - (bound.height ?? 0) / 2];
          } else {
            newData['point'] = [data.x, data.y];
          }
        }
        if (data.fontSize) {
          newData['style'] = {
            size: convertFontSize(data.fontSize),
          };
        }
        newRecord = {
          ...record,
          type: 'create',
          data: {
            shapes: {
              [assetId]: newData,
            },
          },
        };
        break;
      }
      case 'REMOVE': {
        const { id } = record.data;
        if (!assetBoundMap[id]) return false;
        newRecord = {
          ...record,
          type: 'delete',
          data: {
            shapes: {
              [id]: undefined,
            },
          },
        };
        break;
      }
      default:
        newRecord = record;
        break;
    }
    if (newRecord) {
      result.push(newRecord);
    }
  });

  return result;
};
