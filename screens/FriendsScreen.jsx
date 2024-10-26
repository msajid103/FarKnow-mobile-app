import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import User from '../components/User'; // Your User component

const FriendsScreen = ({ route }) => {
  const userdata = route.params; // Get the passed 'users' from route params
  console.log('Friends:', userdata.friends)
  return (
    <SafeAreaView>
      <FlatList
        data={userdata.friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          < User 
            userName={item}

      />
        )}
      />
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
