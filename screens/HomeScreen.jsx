import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import CardegoryList from '../components/Home/CardegoryList';
import Posts from '../components/Home/Posts';
const HomeScreen = ({navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header/>
        <CardegoryList />
        <Posts />
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('ChatBot')}>
        <Icon name="aliwangwang" size={30} color="black" />
      </TouchableOpacity>
    </SafeAreaView>   
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: 'rgba(255, 156, 1, 0.7)', 
    width: 60,
    height: 60,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

