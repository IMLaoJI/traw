import { TldrawApp } from '@tldraw/tldraw';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ignoreFunc = () => {};

export class TrawCanvasApp extends TldrawApp {
  onZoom = ignoreFunc;
  onPan = ignoreFunc;

  constructor(id?: string, callbacks = {} as any) {
    super(id, callbacks);
  }
}
