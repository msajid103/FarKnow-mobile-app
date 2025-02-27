import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SocialLoginScreen from '../screens/SocialLoginScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AboutScreen from '../screens/About/AboutScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SocialLogin" component={SocialLoginScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="SignUp" component={RegisterScreen} options={{ title: 'Sign Up' }} />
    <AuthStack.Screen name="About" component={AboutScreen} options={{ headerShown: true }} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
