import { AppState, AppStateStatus } from 'react-native';
import { useEffect, useRef } from 'react';

/**
 * Reusable AppState watcher hook
 * Runs the provided callback whenever the app comes back to foreground
 */
export function useAppStateForeground(callback: () => void | Promise<void>) {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
          await callback();
        }
        appState.current = nextAppState;
      }
    );

    return () => subscription.remove();
  }, [callback]);
}
