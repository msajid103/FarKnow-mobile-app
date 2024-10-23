import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import bg from "../assets/bg.jpg"
const Background = () => { 
  return (
    <View style={styles.container}>    
      <View style={styles.topHalf}>
        <Image
          source={bg}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          style={styles.gradient}
        />
      </View>    
      <View style={styles.bottomHalf}>
      </View >         
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHalf: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute', // Overlay the gradient on top of the image
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%', // Adjust the height to control the gradient area
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Background;
