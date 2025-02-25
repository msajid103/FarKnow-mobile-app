import React from 'react';
import { StyleSheet, ImageBackground, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import FooterScreen from '../Footer/FooterScreen';

const AboutScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style = {{borderRadius:10 ,padding:10, position:'absolute',left:10, top:10,}}
            onPress={()=> navigation.goBack()}
            >
              <Text style={{color: 'white', fontWeight:900,}}>
                Skip
              </Text>
            </TouchableOpacity>
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>

        {/* <Text style={styles.projectTitle}>
          Project Title
        </Text> */}
        <Text style={styles.projectHeading}>Farmer to Farmer Knowledge Sharing Mobile App</Text>
        {/* <Text style={styles.textHeading}>About Us</Text> */}

        <Text style={styles.paraText}>This project empowers farmers by providing a platform to connect with expert farmers through chat for advice on farming, soil, and agriculture-related queries. It includes a chatbot to offer instant responses and guidance, enhancing accessibility to information. Farmers can post questions, share experiences, and receive location-based, timely notifications about crop diseases and updates. The app also promotes collaborative learning and supports sustainable farming practices. With its features, it bridges the knowledge gap, ensuring farmers have the tools to succeed</Text>

          <FooterScreen/>
      </ScrollView>


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  mainContainer: {
    marginTop: 200,
    padding: 20,
    backgroundColor: "white",
    // alignItems:'center',
    borderRadius: 20,
  },
  projectTitle: {
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    fontWeight: '600'
  },
  projectHeading: {
    color: 'orange',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30

  },
  textHeading: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  paraText: {
    // padding:10,
    marginTop: 15,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', // Green primary color
    marginBottom: 5,
    marginTop: 10
    // textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8C00', // Orange accent color
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,   
    resizeMode: 'contain',
    // marginTop: 10,
  },
});

export default AboutScreen;
