import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import * as React from 'react';

import { useTldrawApp } from 'hooks/useTldrawApp';
import type { TDSnapshot } from '@tldraw/tldraw';

const isToolLockedSelector = (s: TDSnapshot) => s.appState.isToolLocked;

export function LockButton() {
  const app = useTldrawApp();

  const isToolLocked = app.useStore(isToolLockedSelector);

  return <button onSelect={app.toggleToolLock}>{isToolLocked ? <LockClosedIcon /> : <LockOpen1Icon />}</button>;
}
