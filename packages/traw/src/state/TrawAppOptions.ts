import { Record, TrawDocument, TrawPlayerOptions, TrawUser } from 'types';

export interface TrawAppOptions {
  /**
   * User
   */
  user: TrawUser;

  /**
   * Document
   */
  document: TrawDocument;

  /**
   * Initial records
   */
  records?: Record[];

  playerOptions?: TrawPlayerOptions;
}
