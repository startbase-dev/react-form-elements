import { useCallback, useEffect, useRef, useState } from 'react';
import { get } from './localStorage';

const INITIAL_COUNTDOWN_SECOND = 120;

export const useCountDown = (name) => {
  let savedSeconds = get(name);
  const saveTime = get(`${name}_TIMER`);
  const currentTime = +new Date();

  if (saveTime && savedSeconds > 0) {
    const diffTime = (currentTime - saveTime) / 1000 - 1;

    if (diffTime > 1) {
      savedSeconds = savedSeconds - Math.floor(diffTime);

      if (savedSeconds < 0) {
        savedSeconds = 0;
      }
    }
  }

  const [seconds, setSeconds] = useState(
    savedSeconds ?? INITIAL_COUNTDOWN_SECOND
  );

  const intervalId = useRef();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setSeconds((state) => (state > 0 ? state - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  const resetSeconds = useCallback((second = INITIAL_COUNTDOWN_SECOND) => {
    setSeconds(second);
  }, []);

  return [seconds, resetSeconds];
};
