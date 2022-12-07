import { migrateRecords } from "./migrate";

describe("Traw record migrate function", () => {
  it("should convert ADD_SLIDE correctly", async () => {
    const selectSlideRecord = {
      id: "record-1",
      blockId: "block-1",
      user: "user-1",
      type: "ADD_SLIDE" as const,
      data: { id: "eEC_4Bh9ADdB0Dr6Gkswr" },
      start: 1,
      end: 1,
      origin: "doc-1",
    };

    const convertedRecord = migrateRecords([selectSlideRecord]);

    expect(convertedRecord[0]).toEqual({
      id: "record-1",
      blockId: "block-1",
      user: "user-1",
      type: "create_page",
      data: { id: "eEC_4Bh9ADdB0Dr6Gkswr" },
      start: 1,
      end: 1,
      origin: "doc-1",
    });
  });

  it("should convert SELECT_SLIDE correctly", async () => {
    const selectSlideRecord = {
      id: "record-1",
      blockId: "block-1",
      user: "user-1",
      type: "SELECT_SLIDE" as const,
      data: { id: "eEC_4Bh9ADdB0Dr6Gkswr" },
      start: 1,
      end: 1,
      origin: "doc-1",
    };

    const convertedRecord = migrateRecords([selectSlideRecord]);

    expect(convertedRecord[0]).toEqual({
      id: "record-1",
      blockId: "block-1",
      user: "user-1",
      type: "change_page",
      data: { id: "eEC_4Bh9ADdB0Dr6Gkswr" },
      start: 1,
      end: 1,
      origin: "doc-1",
    });
  });

  it("should convert ADD TEXT correctly", async () => {
    const addRecord = {
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "ADD" as const,
      data: {
        type: "TEXT",
        data: {
          x: 4,
          y: 8,
          fontSize: 40,
          text: "Test content",
          color: "#000000",
          align: "left",
        },
        assetId: "asset-1",
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-1",
    };

    const convertedRecord = migrateRecords([addRecord]);

    expect(convertedRecord[0]).toEqual({
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "edit" as const,
      data: {
        shapes: {
          "asset-1": {
            id: "asset-1",
            type: "text",
            name: "Text",
            parentId: "slide-1",
            childIndex: 1,
            point: [4, 8],
            rotation: 0,
            text: "Test content",
            style: {
              color: "black",
              size: "medium",
              isFilled: false,
              dash: "draw",
              scale: 1,
              font: "sans",
              textAlign: "start",
            },
          },
        },
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-1",
    });
  });

  it("should convert ADD PATH correctly", async () => {
    const addRecord = {
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "ADD" as const,
      data: {
        type: "PATH",
        data: {
          color: "PURPLE",
          thickness: 8,
          positions: [1, 2, 0, 3, 4, 0],
        },
        assetId: "asset-1",
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-1",
    };

    const convertedRecord = migrateRecords([addRecord]);

    expect(convertedRecord[0]).toEqual({
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "create_draw" as const,
      data: {
        shapes: {
          "asset-1": {
            id: "asset-1",
            type: "draw",
            name: "Draw",
            parentId: "slide-1",
            childIndex: 1,
            point: [1, 2],
            rotation: 0,
            style: {
              color: "violet",
              size: "small",
              isFilled: false,
              dash: "draw",
              scale: 1,
            },
            points: [
              [0, 0, 0.5],
              [2, 2, 0.5],
            ],
            isComplete: true,
          },
        },
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-1",
    });
  });
});