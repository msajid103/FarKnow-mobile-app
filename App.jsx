import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import SplashScreen from './screens/SplashScreen';
import SocialLoginScreen from './screens/SocialLoginScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import FriendsScreen from './screens/FriendsScreen';
import TestScreen from './screens/TestScreen';
import ChatDataScreen from './screens/ChatDataScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import AboutScreen from './screens/About/AboutScreen';
import MenuScreen from './screens/MenuScreen';
import ProfileScreen from './screens/Profile';

// Create a Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, 
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SocialLogin" component={SocialLoginScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={RegisterScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: 'Add Friends' }} />
        <Stack.Screen name="Test" component={TestScreen} options={{ title: 'Test' }} />
        <Stack.Screen name="ChatData" component={ChatDataScreen} options={{ title: 'Chat Data' }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} options={{ title: 'Crop Assistant Bot' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{title:"About us"}} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
