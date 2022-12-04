export enum ActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
  ADD_SLIDE = 'ADD_SLIDE',
  SORT_SLIDE = 'SORT_SLIDE',
  DELETE_SLIDE = 'DELETE_SLIDE',
  SELECT_SLIDE = 'SELECT_SLIDE',
  SUBSCRIBE_SLIDE = 'SUBSCRIBE_SLIDE',
}

export type Record = {
  type: ActionType;
  data: any;
  id: string;
  slideId: string;
  user: string;
  start: number;
  end: number;
  origin: string;
};