import React, { useEffect, useId, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import PostCard from '../components/Home/PostCard';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Home/Header';
const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userdata, setUserdata] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(userId)
          .get();
        if (userDoc.exists) {
          setUserdata({ userId, ...userDoc.data() }); // Store data in useState

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
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
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
