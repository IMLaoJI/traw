import { migrateRecords } from "./migrate";

describe("Traw record", () => {
  it("should convert correctly", async () => {
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
      type: "SELECT_SLIDE",
      data: { id: "eEC_4Bh9ADdB0Dr6Gkswr" },
      start: 1,
      end: 1,
      origin: "doc-1",
    });
  });
});
