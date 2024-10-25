import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import Logo from '../components/Logo';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

const SocialLoginScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')} // Path to your background image
      style={styles.background}
      resizeMode="cover" // or "stretch" or "contain" depending on your needs
    >
       <SharedElement id="logo">
       <Logo />
      </SharedElement>     
     <Pressable
     onPress={()=>{
        navigation.navigate('Login')
     }}>
     <Text style={{color:'black',backgroundColor:'orange',paddingVertical:12, paddingHorizontal:50}}>Login Using Email</Text>
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

SocialLoginScreen.sharedElements = () => {
  return [{ id: 'logo' }];
};
export default SocialLoginScreen;
