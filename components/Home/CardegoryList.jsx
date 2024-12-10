import { StyleSheet, Text, ScrollView,View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import CategoryCard from './CategoryCard'

const CardegoryList = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categorySnapshot = await firestore().collection('Category').get();
                const categoryData = categorySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setCategories(categoryData);
            } catch (error) {
                console.log("Error fetching category:", error);
            }
        };
        fetchCategory()
    }, [])
    return (
        <>
            <Text style={styles.sectionTitle}>Categories</Text>
            {/* <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CategoryCard data={item} />}
                horizontal
            /> */}
            <ScrollView horizontal>
                {categories.map((category, index) => (
                    <CategoryCard key={index} data={category} />
                ))}
            </ScrollView>
        </>

    )
}

export default CardegoryList

const styles = StyleSheet.create({})