import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import Logo from '../components/Logo';
import Animated from 'react-native-reanimated';

const SocialLoginScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')} // Path to your background image
      style={styles.background}
      resizeMode="cover" // or "stretch" or "contain" depending on your needs
    >
      <Animated.View style={styles.container} sharedTransitionTag="logo">
            <Logo />
          </Animated.View>
     <Pressable
     onPress={()=>{
        navigation.navigate('Login')
     }}>
     <Text style={{color:'black',backgroundColor:'orange',paddingVertical:12, paddingHorizontal:50}}>Sajid</Text>
     </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center', 
    gap:150
  },


});

export default SocialLoginScreen;
