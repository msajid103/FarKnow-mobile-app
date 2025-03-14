// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("userId");
        
        if (!jsonValue) {
          setLoading(false);
          return;
        }
        
        const userId = JSON.parse(jsonValue);
        console.log('jsonvalu=',jsonValue, userId)
        if (userId) {
          const userDoc = await firestore()
            .collection('Users')
            .doc(userId)
            .get();
            
          if (userDoc.exists) {
            const userDataFromFirestore = userDoc.data();
            console.log("User data fetched successfully:", userDataFromFirestore);
            setUserData({ userId, ...userDataFromFirestore });
          } else {
            console.log('No such User');
            setError('User not found in database');
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const value = {
    userData,
    setUserData,
    loading,
    error,
    isAuthenticated: !!userData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);