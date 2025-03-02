import React from 'react';
import { StyleSheet, ImageBackground, View, Text, ScrollView, Dimensions } from 'react-native';
import FooterScreen from '../Footer/FooterScreen';

const { width, height } = Dimensions.get('window');

// Function to scale font size based on screen width
const scaleFontSize = (size) => {
  const scaleFactor = width / 375; // 375 is the base width (iPhone 12/13 mini)
  return size * scaleFactor;
};

const AboutScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Semi-transparent overlay */}
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.card}>
            <Text style={[styles.projectHeading, { fontSize: scaleFontSize(24) }]}>
              Farmer to Farmer Knowledge Sharing Mobile App
            </Text>
          </View>

          {/* Content Section */}
          <View style={[styles.card, { marginTop: height * 0.02 }]}>
            <Text style={[styles.paraText, { fontSize: scaleFontSize(16) }]}>
              This project empowers farmers by providing a platform to connect with expert farmers through chat for advice on farming, soil, and agriculture-related queries. It includes a chatbot to offer instant responses and guidance, enhancing accessibility to information. Farmers can post questions, share experiences, and receive location-based, timely notifications about crop diseases and updates. The app also promotes collaborative learning and supports sustainable farming practices. With its features, it bridges the knowledge gap, ensuring farmers have the tools to succeed.
            </Text>
          </View>

          {/* Footer */}
          <FooterScreen />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(161, 207, 116, 0.42)', // Semi-transparent white overlay
  },
  mainContainer: {
    flexGrow: 1,
    padding: width * 0.05, // 5% of screen width
    paddingTop: height * 0.05, // 5% of screen height
    paddingBottom: height * 0.03, // 3% of screen height
  },
  card: {
    marginTop: "8%",
    backgroundColor: '#FFFFFF', // White background for cards
    borderRadius: 15,
    padding: width * 0.05, // 5% of screen width
    shadowColor: '#000', // Shadow for card effect
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  projectHeading: {
    color: '#2E8B57', // Dark green for better contrast
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: scaleFontSize(32), // Responsive line height
  },
  paraText: {
    color: '#333', // Darker text for better readability
    lineHeight: scaleFontSize(22), // Responsive line height
    textAlign: 'justify', // Justified text for a cleaner look
  },
});

export default AboutScreen;