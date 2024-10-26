import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CreatePostScreen = ({ route, navigation }) => {
    const userdata = route.params
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handlePostSubmit = async () => {
        if (content.trim() === '' && imageUrl.trim() === '') {
            Alert.alert('Error', 'Please Fill all field.');
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
                createdAt: firestore.FieldValue.serverTimestamp()
            };
            const postRef = await firestore().collection('Posts').add(post);
            await firestore()
                .collection('Users')
                .doc(userId)
                .update({
                    posts: firestore.FieldValue.arrayUnion(postRef.id) // Adds the postId to the array
                });
            Alert.alert('Success', 'Post created successfully!');
            setContent('');
            setImageUrl('');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to create post.');
        }
    };

    return (
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
            <Button title="Post" onPress={handlePostSubmit} color="#4A55A2" />
        </View>
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
