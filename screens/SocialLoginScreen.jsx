import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/AntDesign'
import Logo from '../components/Logo';
import { SharedElement } from 'react-navigation-shared-element';

const SocialLoginScreen = ({ navigation }) => {
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
        onPress={() => {
          navigation.navigate('Login')
        }}>
        <Text style={styles.emailButton}>Login with email</Text>
      </Pressable>

      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>or use social login</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.socilaContainer}>       
          <Icons name="google" size={25} color='black'/>
          <Text style ={{color:'black'}}>Continue with Google</Text>     
      </TouchableOpacity>
      <TouchableOpacity style={styles.socilaContainer}>       
          <Icon name="facebook" size={25} color='black'/>
          <Text style ={{color:'black'}}>Continue with Facebook</Text>     
      </TouchableOpacity>
      <TouchableOpacity style={styles.socilaContainer}>       
          <Icon name="apple" size={25} color='black'/>
          <Text style ={{color:'black'}}>Continue with Apple</Text>     
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUp} onPress={()=> navigation.navigate('Test')}>
        <Text style={{color: 'black'}}>Don't have account?</Text>
       <Text style={{fontWeight: 'bold',color: 'black'}}> TestScreen</Text>        
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
    gap: 20
  },
  container: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'flex-end', // Center vertically
    marginVertical: 10,   // Add spacing above and below
  },
  line: {
    flex: 1, // Allow lines to expand and fill space
    height: 1, // Line thickness
    backgroundColor: 'black', // Line color
  },
  text: {
    marginHorizontal: 10, // Spacing around the text
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  socilaContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
    paddingVertical: 13,
    paddingHorizontal: 50,
    borderRadius: 35, 
    borderBlockColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F0E5E5',
    width: 290,
    gap: 20  
  },
  signUp:{
    flexDirection:'row',    
  }

});

SocialLoginScreen.sharedElements = () => {
  return [{ id: 'logo' }];
};
export default SocialLoginScreen;
