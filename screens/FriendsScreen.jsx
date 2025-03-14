import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import {
  fetchUsers,
  acceptFriendRequest,
  deleteFriendRequest,
  sendFriendRequest,
} from "../firebase/firestoreService"
import { useUser } from '../context/UserContext';

const FriendsScreen = ({ route }) => {

  const { userData } = useUser();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchUsers(setUsers, setLoading);
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    const isReceivedRequest = userData?.friendRequests?.received?.includes(item.id);

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
                onPress={() => acceptFriendRequest(userData, item.id, setUsers)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteFriendRequest(userData, item.id, setUsers)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => sendFriendRequest(userData, item.id, setUsers)}
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
      user.id !== userData.userId &&
      !userData?.friends?.includes(user.id) &&
      !userData?.friendRequests?.sent?.includes(user.id)
  );

  if (filteredUsers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No users found.</Text>
      </View>
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
    justifyContent: "center",
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "yellow",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FriendsScreen;
