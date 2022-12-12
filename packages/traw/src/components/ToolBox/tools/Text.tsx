import { TDShapeType } from '@tldraw/tldraw';
import SvgTextField from '../../../icons/text-field';
import { TrawToolInfo } from '../../../types';

export const info: TrawToolInfo = {
  type: TDShapeType.Text,
  Icon: SvgTextField,
  label: 'Text (T or 3)',
  shortcut: ['T', 3],
};
