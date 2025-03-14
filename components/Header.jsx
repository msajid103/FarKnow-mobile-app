import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData, loading, error } = useUser();
  
  const getIconColor = (screenName) => (route.name === screenName ? 'orange' : 'black'); 



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading user data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something went wrong</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.replace('Splash')}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If userData is null or undefined, show a placeholder
  if (!userData) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileContent}>
            <View style={styles.placeholderImage} />
            <Text style={styles.welcomeText}>Welcome!</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Icon name="search" size={35} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Icon name="menu" size={35} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={35} color={getIconColor('Home')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
            <Icon name="person-add" size={35} color={getIconColor('Friends')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Icon name="edit" size={35} color={getIconColor('CreatePost')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ChatData')}>
            <Icon name="chat" size={35} color={getIconColor('ChatData')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileContent}>
          {userData.imageUrl ? (
            <Image 
              source={{ uri: userData.imageUrl }} 
              style={styles.profileImage}
              defaultSource={require('../assets/bg.jpg')} // Add a default image
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <Text style={styles.welcomeText}>{userData.name || 'User'}!</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Icon name="search" size={35} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Icon name="menu" size={35} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={35} color={getIconColor('Home')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
          <Icon name="person-add" size={35} color={getIconColor('Friends')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Icon name="edit" size={35} color={getIconColor('CreatePost')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatData')}>
          <Icon name="chat" size={35} color={getIconColor('ChatData')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: "#32CD32",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingVertical: 10,
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
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop: 5,

  },
  icon: {
    marginHorizontal: 10,
    
  },
});


export default Header;