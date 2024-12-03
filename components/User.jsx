import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
export default function User({ userName }) {
  console.log('User:', userName)
  return (
    <Pressable style={styles.userCard}>
      <View style={styles.imgContainer}>
        {/* <Image style={styles.img} source={{ uri: userProfilePic }} /> */}
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ color: 'black', paddingBottom: 2 }}>{userName}</Text>
        <Text>name@email.com</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={styles.btn_text}>Add Friend</Text>
      </Pressable>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  imgContainer: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden', // Ensure image fits within rounded container
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  btn: {
    backgroundColor: '#4A55A2',
    padding: 12,
    borderRadius: 6,
    width: 105,
  },
  btn_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
});
