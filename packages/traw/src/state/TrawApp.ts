import { TldrawApp, TDToolType, TDShapeType } from '@tldraw/tldraw';
import createVanilla, { StoreApi } from 'zustand/vanilla';
import { migrateRecords } from '../components/utils/migrate';
import { Record, TrawSnapshot } from '../types';

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
  private _actionStartTime: number;

  constructor() {
    this.app = new TrawCanvasApp('', {
      onSessionStart: this.setActionStartTime,
    });

    this.app.onCommand = this.recordCommand;

    this._state = {
      records: [],
    };
    this.store = createVanilla(() => this._state);
    console.log(this);
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

  setActionStartTime = (app, id) => {
    this._actionStartTime = Date.now();
  };

  recordCommand = (app, command) => {
    console.log(command);
    switch (command.id) {
      case 'change_page':
        break;
      case 'create_page':
        break;
      case 'delete_page':
        break;
      default:
        const pageId = Object.keys(command.after.document.pages)[0];

        this.store.setState((state) => {
          return {
            ...state,
            records: [
              ...state.records,
              {
                type: command.id,
                data: command.after.document.pages[pageId],
                slideId: pageId,
                start: this._actionStartTime ? this._actionStartTime : 0,
                end: Date.now(),
              } as Record,
            ],
          };
        });
        this._actionStartTime = 0;
        console.log(this.store.getState());
        break;
    }
  };

  addRecords = (records: Record[]) => {
    records = migrateRecords(records);

    records.forEach((record) => {
      switch (record.type) {
        case 'create_page':
          this.app.patchState({
            document: {
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
            document: {
              pageStates: {
                [record.data.id]: {
                  id: record.data.id,
                  selectedIds: [],
                  camera: { point: [0, 0], zoom: 1 },
                },
              },
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
        default:
          const { type, data, slideId } = record;
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
