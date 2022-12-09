import { createContext, useState, useEffect, useContext, RefObject } from 'react';
import { TrawApp } from '../state/TrawApp';

export const TrawContext = createContext<TrawApp>({} as TrawApp);

const useForceUpdate = () => {
  const [_state, setState] = useState(0);
  useEffect(() => setState(1), []);
};

export function useTrawApp() {
  const context = useContext(TrawContext);
  return context;
}

export const ContainerContext = createContext({} as RefObject<HTMLDivElement>);

export function useContainer() {
  const context = useContext(ContainerContext);
  useForceUpdate();
  return context;
}
