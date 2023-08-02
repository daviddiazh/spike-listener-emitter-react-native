import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenT1} from '../screens/ScreenT1';
import {ScreenT2} from '../screens/ScreenT2';
import {ScreenT3} from '../screens/ScreenT3';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={ScreenT1} />
        <Stack.Screen name="Screen2" component={ScreenT2} />
        <Stack.Screen name="Screen3" component={ScreenT3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
