import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// Sample PostCard Component for UI
const PostCard = ({post, navigation}) => {
  const [likes, setLikes] = useState(post.likes);
  return (
    <View style={styles.card}>
      {/* User Information */}
      <TouchableOpacity onPress={() =>{
        navigation.navigate("Chat", {
          userName: post.userName,
          userProfilePic: post.userProfilePic,
        })
      } } style={styles.actionButton}>
      <View style={styles.userInfo}>
        <Image source={{ uri: post.createrImageUrl }} style={styles.profilePic} />
        <Text style={styles.userName}>{post.createrName}</Text>
      </View>
      </TouchableOpacity>


      {/* Post Content: Text and/or Image */}
      <View style={styles.postContent}>
      {post.content && <Text style={styles.postText}>{post.content}</Text>}
        {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => setLikes(likes + 1)} style={styles.actionButton}>
          <Text style={styles.actionText}>Like {post.likes.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Comment {post.commints.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for PostCard
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postContent: {
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    marginBottom: 15,
    fontSize: 14,
    color: '#333',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionText: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default PostCard;
