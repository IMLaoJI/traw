import { useTldrawApp } from 'hooks/useTldrawApp';
import * as React from 'react';

export function DeleteButton() {
  const app = useTldrawApp();

  const handleDelete = React.useCallback(() => {
    app.delete();
  }, [app]);

  const hasSelection = app.useStore(
    (s) => s.appState.status === 'idle' && s.document.pageStates[s.appState.currentPageId].selectedIds.length > 0,
  );

  return (
    <button disabled={!hasSelection} onSelect={handleDelete}>
      delete
    </button>
  );
}
