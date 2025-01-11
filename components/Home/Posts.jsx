import { StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';
import PostCard from './PostCard';

const Posts = () => {
    const [postsData, setPostsData] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsSnapshot = await firestore().collection('Posts').get();
                const postsData = postsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPostsData(postsData);
            } catch (error) {
                console.log("Error fetching posts:", error);
            }
        };
        fetchPosts()
    }, [postsData]);
    return (
        <FlatList
            data={postsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard post={item} />}
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default Posts

const styles = StyleSheet.create({})