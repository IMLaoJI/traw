import { Record } from "../../types";

export const migrateRecords = (records: Record[]): Record[] => {
  const result: Record[] = [];
  records.forEach((record) => {
    let newRecord;
    switch (record.type) {
      case "SELECT_SLIDE":
        newRecord = record;
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
