import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text, ActivityIndicator } from 'react-native';
import Logo from '../components/Logo'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        
        if (userId) {
          navigation.replace('App');
        } else {
          navigation.replace('Auth');
        }
      } catch (error) {
        console.error('Error checking userId:', error);
        navigation.replace('Auth'); 
      }
    };

    
    setTimeout(() => {
      checkUserId();
    }, 1000);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Background image
      style={styles.background}
      resizeMode="cover" // Cover the entire background
    >
      <Logo />

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading.....</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default SplashScreen;
