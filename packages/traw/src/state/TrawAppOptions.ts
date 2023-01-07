import { TRRecord, TrawDocument, TrawPlayerOptions, TrawUser } from 'types';

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
  records?: TRRecord[];

  /**
   * Speech Recognition Language
   * @default 'en-US'
   */
  speechRecognitionLanguage?: string;

  playerOptions?: TrawPlayerOptions;
}
