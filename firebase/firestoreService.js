import firestore from "@react-native-firebase/firestore"


export const createUserDocument = async (userId, email, name) => {
    try {
        const userDocRef = firestore().collection("Users").doc(userId);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            await userDocRef.set({
                name: name.trim() || "New User",
                email: email.trim(),
                imageUrl: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
                friends: [],
                friendRequests: {
                    sent: [],
                    received: [],
                },
                chats: [],
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            });
        }
    } catch (error) {
        throw error;
    }
};



export const fetchUsers = (setUsers, setLoading) => {
  return firestore()
    .collection('Users')
    .onSnapshot((snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(fetchedUsers);
      setLoading(false);
    });
};

// Accept a friend request
export const acceptFriendRequest = async (currentUser, friendId, setUsers) => {
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

    await firestore().collection('Users').doc(currentUser.userId).update({
      friends: firestore.FieldValue.arrayUnion(friendId),
      'friendRequests.received': firestore.FieldValue.arrayRemove(friendId),
    });

    await firestore().collection('Users').doc(friendId).update({
      friends: firestore.FieldValue.arrayUnion(currentUser.userId),
      'friendRequests.sent': firestore.FieldValue.arrayRemove(currentUser.userId),
    });

    // Create a chat
    const chatRef = await firestore().collection('Chats').add({
      participants: [currentUser.userId, friendId],
      lastMessage: null,
      createdAt: firestore.Timestamp.now(),
    });

    await firestore().collection('Users').doc(currentUser.userId).update({
      chats: firestore.FieldValue.arrayUnion(chatRef.id),
    });

    await firestore().collection('Users').doc(friendId).update({
      chats: firestore.FieldValue.arrayUnion(chatRef.id),
    });

    await firestore().collection('Chats').doc(chatRef.id).collection('messages').add({
      text: 'Text Message to start Conversation!',
      senderId: 'system',
      timestamp: firestore.Timestamp.now(),
      seenBy: [currentUser.userId, friendId],
    });
  } catch (error) {
    console.error('Error accepting friend request:', error);
  }
};

// Delete a friend request
export const deleteFriendRequest = async (currentUser, senderId, setUsers) => {
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

    await firestore().collection('Users').doc(currentUser.userId).update({
      'friendRequests.received': firestore.FieldValue.arrayRemove(senderId),
    });

    await firestore().collection('Users').doc(senderId).update({
      'friendRequests.sent': firestore.FieldValue.arrayRemove(currentUser.userId),
    });
  } catch (error) {
    console.error('Error deleting friend request:', error);
  }
};

// Send a friend request
export const sendFriendRequest = async (currentUser, receiverId, setUsers) => {
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

    await firestore().collection('Users').doc(currentUser.userId).update({
      'friendRequests.sent': firestore.FieldValue.arrayUnion(receiverId),
    });

    await firestore().collection('Users').doc(receiverId).update({
      'friendRequests.received': firestore.FieldValue.arrayUnion(currentUser.userId),
    });
  } catch (error) {
    console.error('Error sending friend request:', error);
  }
};
