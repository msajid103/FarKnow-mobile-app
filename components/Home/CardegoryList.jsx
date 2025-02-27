import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import CategoryCard from './CategoryCard'; // Assuming this is your custom component for displaying categories

const CardegoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categorySnapshot = await firestore().collection('Category').get();
                const categoryData = categorySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoryData);
            } catch (error) {
                console.log("Error fetching category:", error);
            }
        };
        fetchCategory();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id} // Ensure each item has a unique id
                renderItem={({ item }) => <CategoryCard data={item} />} // Render each category card
                horizontal // Set to horizontal
                showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
                contentContainerStyle={styles.categoryList} // Optional: Add styles for the FlatList
            />
        </View>
    );
};

export default CardegoryList;

// Styles for your components
const styles = StyleSheet.create({
    container: {
        marginVertical: 10, // Space around the category list
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, // Space below the title
        marginLeft:"2%"
    },
    categoryList: {
        paddingHorizontal: 10, // Optional: Padding for the category list
    },
});
