import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import User from '../components/User'; 
import Header from '../components/Home/Header';

const FriendsScreen = ({ route }) => {
  const userdata = route.params; 
  return (
    <SafeAreaView>
         {userdata && (
        <Header userData={userdata} />
      )}
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
