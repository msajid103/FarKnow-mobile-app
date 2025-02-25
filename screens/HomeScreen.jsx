import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import CardegoryList from '../components/Home/CardegoryList';
import Posts from '../components/Home/Posts';
const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userdata, setUserdata] = useState(null);
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
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header userData={userdata} />
        <CardegoryList />
        <Posts />
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('ChatBot')}>
        <Icon name="aliwangwang" size={30} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
    // <FlatList
    //   data={postsData}
    //   keyExtractor={(item) => item.id}
    //   renderItem={({ item }) => <PostCard post={item} />}
    //   showsHorizontalScrollIndicator={false}
    //   ListHeaderComponent={<Header userData={userdata} />}
    //   ListFooterComponent={CardegoryList}
    //   showsVerticalScrollIndicator={false}
    // />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute', // Position fixed on the screen
    bottom: 20, // Distance from the bottom
    right: 20, // Distance from the right
    backgroundColor: 'rgba(255, 156, 1, 0.7)', // Background color
    width: 60,
    height: 60,
    borderRadius: 30, // Make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

