import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { SharedElement } from 'react-navigation-shared-element';
import Animated from 'react-native-reanimated';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('SocialLogin');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >    
      <SharedElement style={{ marginBottom: 150} } id="logo">
        <Logo />
      </SharedElement>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

export default SplashScreen;
