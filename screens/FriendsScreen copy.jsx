import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../context/UserContext';

const FriendsScreen = ({ route }) => {
  const { userData} = useUser();
  const currentUser = userData.userId || {};

  console.log('frineds', userData.userId)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Users')
      .onSnapshot((snapshot) => {
        const fetchedUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);
  const handleAcceptRequest = async (friendId) => {
    if (!currentUser) return;

    try {

      currentUser.friends = [...(currentUser.friends || []), friendId];
      currentUser.friendRequests.received = currentUser.friendRequests.received.filter(
        (id) => id !== friendId
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === friendId
            ? { ...user, friends: [...(user.friends || []), currentUser.userId] }
            : user
        )
      );
      await firestore()
        .collection('Users')
        .doc(currentUser.userId)
        .update({
          friends: firestore.FieldValue.arrayUnion(friendId),
          'friendRequests.received': firestore.FieldValue.arrayRemove(friendId),
        });

      await firestore()
        .collection('Users')
        .doc(friendId)
        .update({
          friends: firestore.FieldValue.arrayUnion(currentUser.userId),
          'friendRequests.sent': firestore.FieldValue.arrayRemove(currentUser.userId),
        });

      const chatRef = await firestore().collection('Chats').add({
        participants: [currentUser.userId, friendId],
        lastMessage: null,
        createdAt: firestore.Timestamp.now(),
      });

      await firestore()
        .collection('Users')
        .doc(currentUser.userId)
        .update({
          chats: firestore.FieldValue.arrayUnion(chatRef.id),
        });

      await firestore()
        .collection('Users')
        .doc(friendId)
        .update({
          chats: firestore.FieldValue.arrayUnion(chatRef.id),
        });

      await firestore()
        .collection('Chats')
        .doc(chatRef.id)
        .collection('messages')
        .add({
          text: 'Text Message to start Conversation!',
          senderId: 'system',
          timestamp: firestore.Timestamp.now(),
          seenBy: [currentUser.userId, friendId],
        });

    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };
  const handleDeleteRequest = async (senderId) => {
    if (!currentUser) return;

    try {
      currentUser.friendRequests.received = currentUser.friendRequests.received.filter(
        (id) => id !== senderId
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === senderId
            ? {
              ...user,
              friendRequests: {
                ...user.friendRequests,
                sent: user.friendRequests.sent.filter((id) => id !== currentUser.userId),
              },
            }
            : user
        )
      );

      await firestore()
        .collection('Users')
        .doc(currentUser.userId)
        .update({
          'friendRequests.received': firestore.FieldValue.arrayRemove(senderId),
        });

      await firestore()
        .collection('Users')
        .doc(senderId)
        .update({
          'friendRequests.sent': firestore.FieldValue.arrayRemove(currentUser.userId),
        });
    } catch (error) {
      console.error('Error deleting friend request:', error);
    }
  };

  const handleSendRequest = async (receiverId) => {
    if (!currentUser) return;

    try {
      currentUser.friendRequests.sent = [...(currentUser.friendRequests.sent || []), receiverId];

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === receiverId
            ? {
              ...user,
              friendRequests: {
                ...user.friendRequests,
                received: [...(user.friendRequests?.received || []), currentUser.userId],
              },
            }
            : user
        )
      );

      await firestore()
        .collection('Users')
        .doc(currentUser.userId)
        .update({
          'friendRequests.sent': firestore.FieldValue.arrayUnion(receiverId),
        });

      await firestore()
        .collection('Users')
        .doc(receiverId)
        .update({
          'friendRequests.received': firestore.FieldValue.arrayUnion(currentUser.userId),
        });
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isReceivedRequest = currentUser?.friendRequests?.received?.includes(item.id);

    return (
      <View style={styles.userCard}>
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/50' }}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          {isReceivedRequest ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptRequest(item.id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRequest(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleSendRequest(item.id)}
            >
              <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Filter out friends and sent requests before passing to FlatList
  const filteredUsers = users.filter(
    (user) =>
      user.id !== currentUser?.userId &&
      !currentUser?.friends?.includes(user.id) &&
      !currentUser?.friendRequests?.sent?.includes(user.id)
  );

  if (filteredUsers.length === 0) {
    return (
      <>
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No users found.</Text>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    borderRadius: 10,
    shadowColor: '#000',
    
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    width: 270,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendText: {
    color: 'green',
    fontWeight: 'bold',
  },
  sentText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'orange',
    width: "37%",
    padding: 10,
    borderRadius:10,
    borderWidth:2,
    borderColor: "yellow",

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FriendsScreen;
