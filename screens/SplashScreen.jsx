import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, ImageBackground } from 'react-native';
import Logo from '../components/Logo';
import { SharedElement } from 'react-navigation-shared-element';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('SocialLogin');
      // navigation.replace('Login');
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
