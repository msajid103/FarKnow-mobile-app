import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

const ChatDataScreen = ({ route }) => {
  const [friendsData, setFriendsData] = useState([]);
  const userdata = route.params;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(userdata.userId).get();
        const userFriends = userDoc.data()?.friends || [];

        // Fetch friends details based on their IDs
        const friendsPromises = userFriends.map((friendId) =>
          firestore().collection('Users').doc(friendId).get()
        );
        console.log('friendsPromises-------',friendsPromises)

        const friendsSnapshots = await Promise.all(friendsPromises);
        console.log('friendsSnapshots-------',friendsSnapshots)


        const fetchedFriends = friendsSnapshots.map((doc) => (
          console.log('doc-------',doc.data()),        
          
          {
          id: doc.id,
          name: doc.data().name,
          avatar: doc.data().imageUrl ,
          lastMessage: doc.data().lastMessage || 'No message available.',
          date: doc.data().date || 'N/A',
        }));

        setFriendsData(fetchedFriends);
      } catch (err) {
        console.log('Error fetching friends:', err);
      }
    };

    fetchFriends();
  }, [userdata.userId]);
  console.log('frinesdss-------',friendsData)
  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.chatDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header userData={userdata} />
      <FlatList
        data={friendsData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatMessage: {
    color: '#777',
    fontSize: 14,
    marginTop: 2,
  },
  chatDate: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default ChatDataScreen;
