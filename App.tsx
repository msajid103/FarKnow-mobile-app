import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'

//Navigation
import { NavigationContainer } from '@react-navigation/native' 
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from './screens/ChatScreen'
import User from './components/User'
import FriendsScreen from './screens/FriendsScreen'
import SplashScreen from './screens/SplashScreen'
import SocialLoginScreen from './screens/SocialLoginScreen'

export type RootStackParamList = {
  Splash: undefined;
  SocialLogin:undefined;
  Login: undefined;
  SignUp: undefined;
  Home: {userId: string};
  Chat: { userName: string; userProfilePic: string };
  Friends: { users: [] }; 
 
};

const Stack = createNativeStackNavigator<RootStackParamList>()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
        name='Splash'
        component={SplashScreen} 
        options={{
          headerShown: false, 
        }}     
        />
        <Stack.Screen name='SocialLogin' component={SocialLoginScreen}
         options={{
          headerShown:false,
        }}/>
        <Stack.Screen name='Login' component={LoginScreen}
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen
        name='SignUp'
        component={RegisterScreen}
        options={{
          title: 'Sign Up'
        }}
        />
        <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home'
        }}
        />
        <Stack.Screen
        name= 'Chat'
        component={ChatScreen}
        options={{
          title: 'Chat'
        }}
        />
        <Stack.Screen
        name= 'Friends'
        component={FriendsScreen}
        options={{
          title: 'Add Friends'
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App

