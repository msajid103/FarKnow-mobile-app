import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';

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

// Create a wrapper component for screens that need the Header
const withHeader = (Component) => (props) => {
  return (
    <>
      <Header />
      <Component {...props} />
    </>
  );
};

const AppStackScreen = () => {
  const { loading } = useUser();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen 
        name="Home" 
        component={withHeader(HomeScreen)} 
      />
      <AppStack.Screen 
        name="Chat" 
        component={withHeader(ChatScreen)} 
      />
      <AppStack.Screen 
        name="Friends" 
        component={withHeader(FriendsScreen)} 
      />
      <AppStack.Screen 
        name="Test" 
        component={withHeader(TestScreen)} 
      />
      <AppStack.Screen 
        name="ChatData" 
        component={withHeader(ChatDataScreen)} 
      />
      <AppStack.Screen 
        name="CreatePost" 
        component={withHeader(CreatePostScreen)} 
      />
      <AppStack.Screen 
        name="ChatBot" 
        component={withHeader(ChatBotScreen)} 
      />
      <AppStack.Screen 
        name="Menu" 
        component={MenuScreen} 
        options={menuOptions} 
      />
      <AppStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={defaultHeaderOptions} 
      />
      <AppStack.Screen 
        name="About" 
        component={AboutScreen} 
        options={aboutOptions}
      />
      <AppStack.Screen 
        name="Changelanguage" 
        component={ChangeLanguageScreen} 
        options={defaultHeaderOptions} 
      />
      <AppStack.Screen 
        name="ChangePassword" 
        component={ForgotPasswordScreen} 
        options={defaultHeaderOptions} 
      />
    </AppStack.Navigator>
  );
};


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
