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

  it("should convert DELETE_SLIDE correctly", async () => {
    const selectSlideRecord = {
      id: "record-1",
      blockId: "block-1",
      user: "user-1",
      type: "DELETE_SLIDE" as const,
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
      type: "delete_page",
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
            point: [4, -12],
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
          positions: [0, 4, 0, 100, 96, 0],
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
            point: [0, 4],
            rotation: 0,
            style: {
              color: "violet",
              size: "large",
              isFilled: false,
              dash: "solid",
              scale: 1,
            },
            points: [
              [0, 0, 0.5],
              [100, 92, 0.5],
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

  it("should convert ADD SHAPE correctly", async () => {
    const addRecord = {
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "ADD" as const,
      data: {
        type: "SHAPE",
        data: {
          color: "GREY",
          thickness: 2,
          x: 10,
          y: 20,
          width: 100,
          height: 80,
          type: "RECTANGLE",
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
      type: "create" as const,
      data: {
        shapes: {
          "asset-1": {
            id: "asset-1",
            type: "rectangle",
            name: "Rectangle",
            parentId: "slide-1",
            childIndex: 1,
            point: [-40, -20],
            size: [100, 80],
            rotation: 0,
            style: {
              color: "gray",
              size: "small",
              isFilled: false,
              dash: "solid",
              scale: 1,
            },
          },
        },
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-1",
    });
  });

  it("should convert ADD IMAGE correctly", async () => {
    const addRecord = {
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "ADD" as const,
      data: {
        type: "IMAGE",
        data: {
          ext: "webp",
          scale: 1,
          x: 0,
          y: 0,
          width: 100,
          height: 80,
        },
        assetId: "asset-1",
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-2/asset-2",
    };

    const convertedRecord = migrateRecords([addRecord]);

    expect(convertedRecord[0]).toEqual({
      id: "record-1",
      blockId: "block-1",
      slideId: "slide-1",
      user: "user-1",
      type: "create" as const,
      data: {
        shapes: {
          "asset-1": {
            id: "asset-1",
            type: "image",
            name: "Image",
            parentId: "slide-1",
            assetId: "asset-1",
            childIndex: 1,
            point: [-50, -40],
            rotation: 0,
            size: [100, 80],
            style: {
              color: "black",
              size: "small",
              isFilled: false,
              dash: "draw",
              scale: 1,
            },
          },
        },
        assets: {
          "asset-1": {
            id: "asset-1",
            type: "image",
            name: "Image.webp",
            src: "https://api.traw.io/documents/doc-2/records/asset-2/file/redirect",
          },
        },
      },
      start: 1670205418616,
      end: 1670205418616,
      origin: "doc-2/asset-2",
    });
  });

  it("should convert UPDATE correctly", async () => {
    const addRecords = [
      {
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
      },
      {
        id: "record-1",
        blockId: "block-1",
        slideId: "slide-1",
        user: "user-1",
        type: "UPDATE" as const,
        data: {
          type: "IMAGE",
          data: {
            x: 10,
            y: 20,
            width: 100,
            height: 80,
            text: "Test content",
          },
          assetId: "asset-1",
        },
        start: 1670205418616,
        end: 1670205418616,
        origin: "doc-2/asset-2",
      },
    ];

    const convertedRecord = migrateRecords(addRecords);

    expect(convertedRecord).toEqual([
      {
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
              point: [4, -12],
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
      },
      {
        id: "record-1",
        blockId: "block-1",
        slideId: "slide-1",
        user: "user-1",
        type: "create" as const,
        data: {
          shapes: {
            "asset-1": {
              point: [-40, -20],
              size: [100, 80],
              text: "Test content",
            },
          },
        },
        start: 1670205418616,
        end: 1670205418616,
        origin: "doc-2/asset-2",
      },
    ]);
  });

  it("should convert REMOVE correctly", async () => {
    const addRecords = [
      {
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
      },
      {
        id: "record-1",
        blockId: "block-1",
        slideId: "slide-1",
        user: "user-1",
        type: "REMOVE" as const,
        data: {
          id: "asset-1",
        },
        start: 1670205418616,
        end: 1670205418616,
        origin: "doc-1",
      },
    ];

    const convertedRecord = migrateRecords(addRecords);

    expect(convertedRecord).toEqual([
      {
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
              point: [4, -12],
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
      },
      {
        id: "record-1",
        blockId: "block-1",
        slideId: "slide-1",
        user: "user-1",
        type: "delete" as const,
        data: {
          shapes: {
            "asset-1": undefined,
          },
        },
        start: 1670205418616,
        end: 1670205418616,
        origin: "doc-1",
      },
    ]);
  });
});
