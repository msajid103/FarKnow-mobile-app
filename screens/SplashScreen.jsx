import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Pressable } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Animated from 'react-native-reanimated';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace('SocialLogin');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <>
      <Background />
      <View style={styles.logo}>
          <Animated.View style={styles.container} sharedTransitionTag="logo">
            <Logo />
          </Animated.View>
      
      </View>



    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: '44%',
    left: '50%',
    transform: [{ translateX: -140 }, { translateY: -150 }],
  },

});

export default SplashScreen;
