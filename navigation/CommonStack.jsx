import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/About/AboutScreen';

const Stack = createStackNavigator();

const CommonStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="About" component={AboutScreen}  options={{ headerShown: true }}  />
    </Stack.Navigator>
  );
};

export default CommonStack;
