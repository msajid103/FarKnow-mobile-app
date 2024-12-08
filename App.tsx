import React from 'react'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native' 
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Easing } from 'react-native-reanimated';
import ChatScreen from './screens/ChatScreen'
import FriendsScreen from './screens/FriendsScreen'
import SplashScreen from './screens/SplashScreen'
import SocialLoginScreen from './screens/SocialLoginScreen'
import TestScreen from './screens/TestScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import ChatBotScreen from './screens/ChatBotScreen'
export type RootStackParamList = {
  Splash: undefined;
  SocialLogin:undefined;
  Login: undefined;
  SignUp: undefined;
  Test: undefined;
  CreatePost: {userdata: object};
  Home: {userId: string};
  Chat: { userName: string; userProfilePic: string };
  Friends: {userdata: object};
  ChatBot: undefined;
 
};
const Stack = createSharedElementStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.out(Easing.ease), // Ease out curve
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
                easing: Easing.out(Easing.ease), // Ease out curve
              },
            },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      >
        <Stack.Screen
        name='Splash'
        component={SplashScreen}           
        />
        <Stack.Screen name='SocialLogin' component={SocialLoginScreen}
         options={{
          headerShown:false        
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
        <Stack.Screen
        name= 'Test'
        component={TestScreen}
        options={{
          title: 'Test'
        }}
        />
        <Stack.Screen
        name= 'CreatePost'
        component={CreatePostScreen}
        options={{
          title: 'CreatePost'
        }}
        />
         <Stack.Screen
          name="ChatBot"
          component={ChatBotScreen} // Add ChatBot screen
          options={{
            title: 'Crop Assistant Bot',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App

