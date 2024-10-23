import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import User from '../components/User'; // Your User component

const FriendsScreen = ({ route }) => {
  const { users } = route.params; // Get the passed 'users' from route params

  return (
    <SafeAreaView>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <User 
            userName={item.userName} 
            userProfilePic={item.userProfilePic} 
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
