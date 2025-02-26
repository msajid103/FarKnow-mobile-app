import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = ({ userData }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const getIconColor = (screenName) => (route.name === screenName ? 'orange' : 'black');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileContent}>
          <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
          <Text style={styles.welcomeText}>{userData.name}!</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Icon name="search" size={35} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu',{userData})}>
            <Icon name="menu" size={35} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home', userData)}>
          <Icon name="home" size={35} color={getIconColor('Home')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Friends', userData)}>
          <Icon name="person-add" size={35} color={getIconColor('Friends')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost', userData)}>
          <Icon name="edit" size={35} color={getIconColor('CreatePost')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChatData', userData)}>
          <Icon name="chat" size={35} color={getIconColor('ChatData')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    backgroundColor: 'green',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 4, // Shadow effect on Android
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
