import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import PostCard from '../components/PostCard';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing icons


const posts = [
  {
    id: '1',
    userName: 'Nisaar Ali',
    userProfilePic: 'https://unsplash.com/photos/man-riding-on-carriage--QrOaXkjqmA',
    text: 'Enjoying a beautiful day!',
    imageUrl: 'https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 12,
  },
  {
    id: '3',
    userName: 'John Doe',
    userProfilePic: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Enjoying a beautiful day!',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661420226112-311050ce30da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 12,
  },
  {
    id: '4',
    userName: 'John Doe',
    userProfilePic: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Enjoying a beautiful day!',
    imageUrl: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 12,
  },
  {
    id: '2',
    userName: 'Jane Smith',
    userProfilePic: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    text: 'Just finished an amazing workout!',
    imageUrl: '',
    likes: 8,
  },
  // Add more posts here...
];

const HomeScreen = ({ navigation }) => {

  React.useEffect(() => {
    navigation.setOptions({
      // Customize headerRight with three icons (Home, Friends, Chat)
      headerRight: () => (
        <View style={styles.headerIcons}>
          {/* Home Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={25} color="blue" />
          </TouchableOpacity>
          {/* Friends Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Friends', {
          users: posts
         
        })}>
            <Ionicons name="people-outline" size={25} color="black" style={styles.iconSpacing} />
          </TouchableOpacity>
          {/* Chat Icon */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-outline" size={25} color="black" style={styles.iconSpacing} />
          </TouchableOpacity> */}
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  iconSpacing: {
    marginLeft: 20, // Adds spacing between icons
  },
});
