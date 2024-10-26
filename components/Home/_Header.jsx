import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ userData }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
      <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'green', // Light background color
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes the image circular
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
