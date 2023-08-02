import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import Background from 'react-native-background-timer';

export const useIOSEmmiter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inactivityCounter, setInactivityCounter] = useState(0);

  // 1 minuto.
  const maxInactivityTime = 1 * 60 * 1000;

  const resetInactivityCounter = () => {
    setInactivityCounter(0);
  };

  const logout = () => {
    resetInactivityCounter();
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    let interval: any;

    Background.start();

    // Cada segundo, incrementa el contador de inactividad.
    if (isLoggedIn) {
      interval = setInterval(() => {
        setInactivityCounter(prevCounter => prevCounter + 1000);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    let interval: any;
    const appState = AppState.currentState;

    if (appState !== 'active') {
      interval = Background.setInterval(() => {
        setInactivityCounter(() => inactivityCounter + 1000);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (inactivityCounter >= maxInactivityTime) {
      console.log('te hemos deslogueado...');
      setIsLoggedIn(false);
    }
  }, [inactivityCounter]);

  return {
    isLoggedIn,
    inactivityCounter,
    resetInactivityCounter,
    logout,
  };
};
