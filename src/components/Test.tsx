import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  //TouchableNativeFeedback
} from 'react-native';
import {useInactivityCounter} from '../hooks/useInactivityCounter';

const Test = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [start, setStart] = useState(false);

  const handle = () => {
    console.log('Te deslogueamos por seguridad');
    setIsLoggedIn(() => !isLoggedIn);
  };
  const {resetInactivityCounter} = useInactivityCounter(handle, start);

  return (
    // <TouchableNativeFeedback onPress={resetInactivityCounter}>
    <View
      onTouchStart={() => {
        resetInactivityCounter();
      }}>
      <View>
        <Text>Hola mundo</Text>
        <Button
          title={isLoggedIn ? 'logout' : 'login'}
          onPress={() => {
            setIsLoggedIn(() => !isLoggedIn);
            setStart(() => !start);
            resetInactivityCounter();
          }}
        />
        {isLoggedIn ? (
          <Text>Estás logueado</Text>
        ) : (
          <Text>Ya no estas logueado</Text>
        )}
      </View>
    </View>
  );
};

export default Test;
