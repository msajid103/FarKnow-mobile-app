import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView,ActivityIndicator , TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Header from '../components/Header';

const ChatDataScreen = ({ route, navigation }) => {
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userdata = route.params;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDoc = await firestore().collection('Users').doc(userdata.userId).get();
        const userFriends = userDoc.data()?.friends || [];

        // Fetch friend details and chat info
        const friendsPromises = userFriends.map(async (friendId) => {
          const friendDoc = await firestore().collection('Users').doc(friendId).get();
          const chatQuery = await firestore()
            .collection('Chats')
            .where('participants', 'array-contains', userdata.userId)
            .get();

          const chatDoc = chatQuery.docs.find((doc) =>
            doc.data().participants.includes(friendId)
          );

          return {
            id: friendId,
            name: friendDoc.data()?.name,
            avatar: friendDoc.data()?.imageUrl,
            lastMessage: chatDoc?.data()?.lastMessage || 'No message available.',
            chatId: chatDoc?.id || null,
            date: chatDoc?.data()?.createdAt?.toDate().toLocaleString() || 'N/A',
          };
        });

        const fetchedFriends = await Promise.all(friendsPromises);
        setFriendsData(fetchedFriends);
      } catch (err) {
        console.log('Error fetching friends:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchFriends();
  }, [userdata.userId]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          chatId: item.chatId,
          userName: item.name,
          userProfilePic: item.avatar,
          friendId: item.id,
          userId:userdata.userId,
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.chatDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading chats...</Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
