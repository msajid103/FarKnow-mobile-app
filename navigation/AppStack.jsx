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
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AppStack = createStackNavigator();

const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="Chat" component={ChatScreen} />
    <AppStack.Screen name="Friends" component={FriendsScreen} />
    <AppStack.Screen name="Test" component={TestScreen} />
    <AppStack.Screen name="ChatData" component={ChatDataScreen} />
    <AppStack.Screen name="CreatePost" component={CreatePostScreen} />
    <AppStack.Screen name="ChatBot" component={ChatBotScreen} />
    <AppStack.Screen name="Menu" component={MenuScreen} options={menuOptions} />
    <AppStack.Screen name="Profile" component={ProfileScreen} options={defaultHeaderOptions} />
    <AppStack.Screen name="About" component={AboutScreen} options={aboutOptions}/>
    <AppStack.Screen name="Changelanguage" component={ChangeLanguageScreen} options={defaultHeaderOptions} />
    <AppStack.Screen name="ChangePassword" component={ForgotPasswordScreen} options={defaultHeaderOptions} />

  </AppStack.Navigator>
);

const defaultHeaderOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#32CD32",
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
};
const menuOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerStyle: { backgroundColor: "#32CD32" }
};

const aboutOptions = {
  headerShown: true,
  headerTransparent: true,
  headerStyle: { backgroundColor: 'transparent' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white'
}
export default AppStackScreen;
