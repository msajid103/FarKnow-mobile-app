import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import navigators
import AppStackScreen from './navigation/AppStack';
import AuthStackScreen from './navigation/AuthStack';
import SplashScreen from './screens/SplashScreen';

const RootStack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthStackScreen} />
        <RootStack.Screen name="App" component={AppStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
