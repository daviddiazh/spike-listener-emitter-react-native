import {useEffect, useState} from 'react';
import BackgroundTimer from 'react-native-background-timer';

// 1 minuto.
// const MAX_INACTIVITY_TIME = 1 * 60 * 1000;
const MAX_INACTIVITY_TIME = 1 * 15 * 1000;
const ONE_SECOND = 1000;

export const useInactivityCounter = (onTimeFinish, onStart) => {
  const [counter, setCounter] = useState(0);

  const resetInactivityCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      if (!onStart) return;
      setCounter(currentCounter => currentCounter + ONE_SECOND);
    }, ONE_SECOND);

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [onStart]);

  useEffect(() => {
    console.log(`Han pasado: ${counter} segundos...`);
    if (counter >= MAX_INACTIVITY_TIME) {
      BackgroundTimer.stopBackgroundTimer();
      onTimeFinish();
    }
  }, [counter]);

  return {
    resetInactivityCounter,
  };
};
