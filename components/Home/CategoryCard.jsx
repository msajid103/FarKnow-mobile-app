import React from 'react';
import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';

const CategoryCard = ({ data }) => {
    return (
      <View style={styles.container}>          
        <TouchableOpacity style={styles.card}>
          <Image source={{ uri: data.imageUrl }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: 'white',
  },
  card: { 
    width:170,
    backgroundColor: '#f8f8f8',
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3, // Shadow effect for Android
  
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius:10
  },
  cardTitle: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryCard;
