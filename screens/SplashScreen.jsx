import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Text, ActivityIndicator } from 'react-native';
import Logo from '../components/Logo'; // Ensure Logo does not render plain text

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SocialLogin'); // Navigate to SocialLogin screen
      // navigation.replace('Login'); // Uncomment if you want to navigate to Login instead
    }, 2000); // Duration before navigation
    return () => clearTimeout(timer); // Cleanup the timer on unmount
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
