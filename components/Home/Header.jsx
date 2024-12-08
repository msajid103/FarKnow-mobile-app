import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const Header = ({ userData, profileImage }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
      <View style={styles.profileContent}>
        <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
        <Text style={styles.welcomeText}>Welcome, {userData.name}!</Text>
      </View>
      <TouchableOpacity>
          <Icon name="menu" size={35} color="gray" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <TouchableOpacity >
          <Icon name="home" size={35} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Friends', userData)}>
          <Icon name="person-add" size={35} color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost',userData)}>
          <Icon name="edit" size={35} color="gray" style={styles.icon} />
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => navigation.navigate('ChatBot')}>
          <Icon name="chat" size={35} color="gray" style={styles.icon} />
        </TouchableOpacity>      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {    
    padding:10,
    backgroundColor: 'green',
    // borderBottomRightRadius: 15,
    // borderBottomLeftRadius: 15,
    elevation: 4, // for shadow effect on Android
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'orange',
    borderBottomWidth: 1, 
    paddingVertical: 15
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',

  },
  iconContainer: {
    paddingVertical: 10,
    marginTop:10,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between'
  },
 
});

export default Header;
