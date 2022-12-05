import { TldrawApp, TDToolType, TDShapeType } from "@tldraw/tldraw";

const ignoreFunc = () => {};

export class TrawCanvasApp extends TldrawApp {
  onZoom = ignoreFunc;
  onPan = ignoreFunc;

  constructor(id?: string, callbacks = {} as any) {
    super(id, callbacks);
  }
}

export class TrawApp {
  app: TrawCanvasApp;

  constructor() {
    this.app = new TrawCanvasApp();
    this.selectTool(TDShapeType.Draw);
  }

  selectTool(tool: TDToolType) {
    this.app.selectTool(tool);
  }

  useSlidesStore() {
    return this.app.useStore();
  }

  useTldrawApp() {
    return this.app;
  }
}
