import React, { useEffect, useId, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import PostCard from '../components/Home/PostCard';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Home/Header';

const posts = [
  {
    id: '1',
    userName: 'Nisaar Ali',
    userProfilePic: 'https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

const HomeScreen = ({ route, navigation }) => {
  const {userId} = route.params;
  const [userdata, setUserdata] = useState(null);  // Start with null or empty object
  const [postsData, setPostsData] = useState(null);  // Start with null or empty object
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(userId)
          .get();
        if (userDoc.exists) {
          setUserdata({userId,...userDoc.data()}); // Store data in useState

        } else {
          console.log('No such User');
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await firestore().collection('Posts').get();
        const postsData = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPostsData(postsData);
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchPosts();
  }, [userId]);

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A55A2" />
      </SafeAreaView>
    );
  }

  
  return (
    <SafeAreaView style={{ flex: 1 }}>      
      {userdata && (
        <Header userData={userdata} />
      )}
      <FlatList
        data={postsData}
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
    marginLeft: 20,
  },
});
