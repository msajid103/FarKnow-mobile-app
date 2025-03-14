

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../components/Header';

const CreatePostScreen = ({ route, navigation }) => {
    const userdata = route.params;
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        
        const user = auth().currentUser;
        if (user) {
            setUserId(user.uid);
            console.log('User ID:', user.uid); 
        } else {
            Alert.alert('Error', 'User not logged in!');
            navigation.goBack(); 
        }
    }, []);

    const handlePostSubmit = async () => {
        if (!userId) {
            Alert.alert('Error', 'User ID not found. Please log in again.');
            return;
        }

        if (content.trim() === '' && imageUrl.trim() === '') {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        try {
            const post = {
                createrName: userdata.name,
                createrImageUrl: userdata.imageUrl,
                createrId: userId,
                content,
                imageUrl,
                likes: [],
                commints: [],
                share: [],
                createdAt: firestore.FieldValue.serverTimestamp(),
            };

            const postRef = await firestore().collection('Posts').add(post);

            await firestore()
                .collection('Users')
                .doc(userId)
                .update({
                    posts: firestore.FieldValue.arrayUnion(postRef.id), // Adds the postId to the array
                });

            Alert.alert('Success', 'Post created successfully!');
            setContent('');
            setImageUrl('');
            navigation.goBack();
        } catch (error) {
            console.error('Error creating post:', error); // Log the error for debugging
            Alert.alert('Error', 'Failed to create post.');
        }
    };

    return (
        <>
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                multiline
                value={content}
                onChangeText={setContent}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Image url"
                multiline
                value={imageUrl}
                onChangeText={setImageUrl}
            />
            <Button title="Post" onPress={handlePostSubmit} color="orange" />
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    textInput: {
        height: 100,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});

export default CreatePostScreen;
