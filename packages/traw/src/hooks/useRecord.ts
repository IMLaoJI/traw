import { useEffect, useState } from "react";
import { TrawApp } from "../state/TrawApp";
import { Record } from "../types";

const useRecord = (
  app: TrawApp,
  records: Record[],
  onAddRecord?: (record: Record) => void
) => {
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    if (!app) return;

    const onCommand = (app, command) => {
      if (!onAddRecord) return;

      const pageId = Object.keys(command.after.document.pages)[0];
      onAddRecord({
        type: command.id,
        data: command.after.document.pages[pageId],
        slideId: pageId,
      } as Record);
    };
    app.onCommand = onCommand;
    return () => {
      app.onCommand = null;
    };
  }, [app, onAddRecord]);

  useEffect(() => {
    if (!app || !records) return;

    records.forEach((record, i) => {
      if (i < pointer) return;
      console.log(record);
      const { type, data, slideId } = record;

      app.patchState({
        document: {
          pages: {
            [slideId]: data,
          },
        },
      });
    });
    setPointer(records.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app, records]);
};

export default useRecord;
