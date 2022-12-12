import { TldrawApp, TDToolType, TldrawCommand, TDSnapshot } from '@tldraw/tldraw';
import createVanilla, { StoreApi } from 'zustand/vanilla';
import { migrateRecords } from '../components/utils/migrate';
import { Record, TrawSnapshot } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ignoreFunc = () => {};

export class TrawCanvasApp extends TldrawApp {
  onZoom = ignoreFunc;
  onPan = ignoreFunc;

  constructor(id?: string, callbacks = {} as any) {
    super(id, callbacks);
  }
}

export interface TRCallbacks {
  /**
   * Called when a new record is created.
   * @param app The Traw app.
   * @param record The record that was created.
   */
  onRecordsCreate?: (app: TrawCanvasApp, records: Record[]) => void;
}

export class TrawApp {
  /**
   * The Tldraw app. (https://tldraw.com)
   * This is used to create and edit slides.
   */
  app: TrawCanvasApp;

  callbacks: TRCallbacks;

  /**
   * A zustand store that also holds the state.
   */
  private store: StoreApi<TrawSnapshot>;

  /**
   * The current state.
   */
  private _state: TrawSnapshot;

  /**
   * The time the current action started.
   * This is used to calculate the duration of the record.
   */
  private _actionStartTime: number | undefined;

  constructor(callbacks = {} as TRCallbacks) {
    this.app = new TrawCanvasApp("", {
      onSessionStart: this.setActionStartTime,
    });

    this.app.onCommand = this.recordCommand;

    this._state = {
      records: [],
    };
    this.store = createVanilla(() => this._state);

    this.callbacks = callbacks;
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

  setActionStartTime = () => {
    this._actionStartTime = Date.now();
  };

  recordCommand = (app, command) => {
    const records: Record[] = [];
    console.log(command);
    switch (command.id) {
      case "change_page":
        records.push({
          type: command.id,
          data: {
            id: command.after.appState.currentPageId,
          },
          start: this._actionStartTime ? this._actionStartTime : 0,
          end: Date.now(),
        } as Record);
        break;
      case "create_page": {
        const pageId = Object.keys(command.after.document.pages)[0];
        records.push({
          type: command.id,
          data: {
            id: pageId,
          },
          start: Date.now() - 1, // Create page must be before select page 
          end: Date.now() - 1,
        } as Record);
        records.push({
          type: "change_page",
          data: {
            id: pageId,
          },
          start: Date.now(),
          end: Date.now(),
        } as Record);
        break;
      }
      case "delete_page":
        break;
      default: {
        const pageId = Object.keys(command.after.document.pages)[0];

        records.push({
          type: command.id,
          data: command.after.document.pages[pageId],
          slideId: pageId,
          start: this._actionStartTime ? this._actionStartTime : 0,
          end: Date.now(),
        } as Record);
        break;
      }
    }

    if (!records.length) return;

    this.callbacks.onRecordsCreate?.(this.app, records);
    this.store.setState((state) => {
      return {
        ...state,
        records: [...state.records, ...records],
      };
    });
    this._actionStartTime = 0;
  };

  addRecords = (records: Record[]) => {
    records = migrateRecords(records);

    records.forEach((record) => {
      switch (record.type) {
        case 'create_page':
          this.app.patchState({
            document: {
              pageStates: {
                [record.data.id]: {
                  id: record.data.id,
                  selectedIds: [],
                  camera: { point: [0, 0], zoom: 1 },
                },
              },
              pages: {
                [record.data.id]: {
                  id: record.data.id,
                  name: 'Page',
                  childIndex: 2,
                  shapes: {},
                  bindings: {},
                },
              },
            },
          });
          break;
        case 'change_page':
          this.app.patchState({
            appState: {
              currentPageId: record.data.id,
            },
          });
          break;
        case 'delete_page':
          this.app.patchState({
            document: {
              pageStates: {
                [record.data.id]: undefined,
              },
              pages: {
                [record.data.id]: undefined,
              },
            },
          });
          break;
        default: {
          const { data, slideId } = record;
          if (!slideId) break;
          this.app.patchState({
            document: {
              pages: {
                [slideId]: {
                  shapes: {
                    ...data.shapes,
                  },
                },
              },
              assets: {
                ...data.assets,
              },
            },
          });
          break;
        }
      }
    });
  };

  createSlide = () => {
    this.app.createPage();
  };

  deleteSlide = () => {
    this.app.deletePage();
  };

  selectSlide = (id: string) => {
    this.app.changePage(id);
  };
}
