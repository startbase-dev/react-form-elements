import { useCallback, useEffect, useRef, useState } from 'react';
import { get } from './localStorage';

const INITIAL_COUNTDOWN_SECOND = 120;

export const useCountDown = (
  name: string
): [number, (second?: number) => void] => {
  let savedSeconds = get(name) as number | null;
  const saveTime = get(`${name}_TIMER`) as number | null;
  const currentTime = +new Date();

  if (saveTime && savedSeconds !== null && savedSeconds > 0) {
    const diffTime = (currentTime - saveTime) / 1000 - 1;

    if (diffTime > 1) {
      savedSeconds = savedSeconds - Math.floor(diffTime);

      if (savedSeconds < 0) {
        savedSeconds = 0;
      }
    }
  }

  const [seconds, setSeconds] = useState<number>(
    savedSeconds ?? INITIAL_COUNTDOWN_SECOND
  );

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setSeconds((state) => (state > 0 ? state - 1 : 0));
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  const resetSeconds = useCallback(
    (second: number = INITIAL_COUNTDOWN_SECOND) => {
      setSeconds(second);
    },
    []
  );

  return [seconds, resetSeconds];
};
