import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import FriendsScreen from '../screens/FriendsScreen';
import TestScreen from '../screens/TestScreen';
import ChatDataScreen from '../screens/ChatDataScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import MenuScreen from '../screens/MenuScreen';
import ProfileScreen from '../screens/Profile';
import AboutScreen from '../screens/About/AboutScreen';

const AppStack = createStackNavigator();

const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <AppStack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
    <AppStack.Screen name="Friends" component={FriendsScreen} options={{ title: 'Add Friends' }} />
    <AppStack.Screen name="Test" component={TestScreen} options={{ title: 'Test' }} />
    <AppStack.Screen name="ChatData" component={ChatDataScreen} options={{ title: 'Chat Data' }} />
    <AppStack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
    <AppStack.Screen name="ChatBot" component={ChatBotScreen} options={{ title: 'Crop Assistant Bot' }} />
    <AppStack.Screen name="Menu" component={MenuScreen} />
    <AppStack.Screen name="Profile" component={ProfileScreen} />
    <AppStack.Screen name="About" component={AboutScreen} options={{ headerShown: true }} />
  </AppStack.Navigator>
);

export default AppStackScreen;
