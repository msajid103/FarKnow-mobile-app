import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import Logo from '../components/Logo';

const SocialLoginScreen = ({ navigation }) => {
  
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style={{ borderRadius: 10, padding: 10, position: 'absolute', left: 20, top: 20, }}
        onPress={() => navigation.navigate('About')}
      >
        <Text style={{ color: 'white', fontWeight: 900 }}>
          About
        </Text>
      </TouchableOpacity>
      <Logo />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.emailButton}>Login with email</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>or use social login</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialContainer} >
        <Icons name="google" size={25} color='black' />
        <Text style={{ color: 'black' }}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialContainer}>
        <Icon name="facebook" size={25} color='black' />
        <Text style={{ color: 'black' }}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialContainer}>
        <Icon name="apple" size={25} color='black' />
        <Text style={{ color: 'black' }}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUp} onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ color: 'black' }}>Don't have an account?</Text>
        <Text style={{ fontWeight: 'bold', color: 'black' }}> Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  emailButton: {
    color: 'black',
    backgroundColor: 'orange',
    paddingVertical: 17,
    paddingHorizontal: 90,
    borderRadius: 25,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 50,
    borderRadius: 35,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F0E5E5',
    width: 290,
    gap: 20,
  },
  signUp: {
    flexDirection: 'row',
  },
});

export default SocialLoginScreen;
