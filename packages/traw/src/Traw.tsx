import React from "react";
import { Header } from "./components/Header";
import { Panel } from "./components/Panel";
import { Slide } from "./components/Slide";
import { TrawContext } from "./hooks/useTrawApp";
import "./index.css";
import { TrawApp } from "./state/TrawApp";
import { TDShapeType } from "@tldraw/tldraw";
import { Record } from "./types";
import useRecord from "./hooks/useRecord";

export interface TrawProps {
  id?: string;
  records?: Record[];
  onAddRecord?: (record: Record) => void;
}

const Traw = ({ id, records = [], onAddRecord }: TrawProps) => {
  const [sId, setSId] = React.useState(id);

  // Create a new app when the component mounts.
  const [app, setApp] = React.useState(() => {

    const app = new TrawApp(id, { });
    app.selectTool(TDShapeType.Draw);
    return app;
  });

  useRecord(app, records, onAddRecord)

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.document?.fonts) return;

    function refreshBoundingBoxes() {
      app.refreshBoundingBoxes();
    }
    window.document.fonts.addEventListener("loadingdone", refreshBoundingBoxes);
    return () => {
      window.document.fonts.removeEventListener(
        "loadingdone",
        refreshBoundingBoxes
      );
    };
  }, [app]);

  // Use the `key` to ensure that new selector hooks are made when the id changes
  return (
    <TrawContext.Provider value={app}>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-14">
          <Header />
        </div>
        <div className="flex flex-row flex-1">
          <div className="flex-1 flex">
            <Slide />
          </div>
          <div className="flex-0 flex">
            <Panel />
          </div>
        </div>
      </div>
    </TrawContext.Provider>
  );
};

export { Traw };
