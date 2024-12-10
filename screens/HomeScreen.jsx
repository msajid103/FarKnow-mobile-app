import React, { useEffect, useId, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUserData();

  }, [userId]);
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="orange" />
      </SafeAreaView>
    );
  }
  return (
    <ScrollView showsScrollIndicator={false}>
      <Header userData={userdata} />
      <CardegoryList />
      <Posts/>
    </ScrollView>


  );

  // return (

  //   <SafeAreaView style={{ flex: 1 }}>
  //     {/* Main FlatList with Header and Category */}
  //     <FlatList
  //       data={postsData}
  //       keyExtractor={(item) => item.id}
  //       ListHeaderComponent={() => (
  //         <>
  //           {userdata && (
  //             <Header userData={userdata} />
  //           )}
  //           {/* Categories - Horizontal FlatList */}
  //           <View style={styles.categoriesSection}>
  //             <Text style={styles.sectionTitle}>Categories</Text>
  //             <FlatList
  //             data={categories}
  //             keyExtractor={(item, index) => index.toString()}
  //             renderItem={({ item }) => <CategoryCard data={item} navigation={navigation} />}
  //             horizontal = {true}

  //           />
  //           </View>
  //         </>
  //       )}
  //       renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
  //           showsVerticalScrollIndicator={false}
  //     />
  //   </SafeAreaView>
  // );
};



export default HomeScreen;

const styles = StyleSheet.create({
  categoriesSection: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },

});
