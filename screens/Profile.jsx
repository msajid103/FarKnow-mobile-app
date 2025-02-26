import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from "react-native-vector-icons/MaterialIcons"; // Ensure this is installed for the back arrow

const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(require('../assets/logo.png'));
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    name: "Sadaqat Rasool",
    age: "23",
    mobile: "705526209",
    village: "E-65, Phase-8, Industrial Area, Balongi, Sakesar, Punjab 404009",
    district: "Mianwali",
    area: "Chakralaa",
  });

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Green Header */}
      <View style={styles.greenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <Text style={styles.cameraText}>📷</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{userData.name}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      {/* Info Container */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age: {userData.age}</Text>
        <Text style={styles.label}>Mobile No: {userData.mobile}</Text>
        <Text style={styles.label}>Village:  {userData.village}</Text>
        <Text style={styles.label}>District: {userData.district}</Text>
        <Text style={styles.label}>Area: {userData.area}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            {Object.keys(userData).map((key) => (
              <TextInput
                key={key}
                style={styles.input}
                value={userData[key]}
                onChangeText={(text) => setUserData({ ...userData, [key]: text })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              />
            ))}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  greenHeader: {
    height: 140,
    backgroundColor: "#32CD32",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    flex: 1,
    paddingTop: 25,
    textAlign: "center",
  },
  profileContainer: { marginTop: 200, alignItems: 'center' },
  profileImage: { width: 150, height: 150, borderRadius: 75 },
  cameraIcon: { position: 'absolute', bottom: 0, right: 10, backgroundColor: 'gray', borderRadius: 20, padding: 5 },
  cameraText: { fontSize: 20, color: 'white' },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 20 },
  editText: { color: 'green', fontSize: 16, marginTop: 5 },
  infoContainer: { width: '90%', marginTop: 25, height: "35%", backgroundColor:"hsla(60, 72.40%, 65.90%, 0.72)", justifyContent: 'center', alignItems: 'center',paddingLeft: "4%", borderRadius:20, borderColor:"yellow", borderWidth:2},
  label: { fontSize: 18, fontWeight: 'bold', marginVertical: 5,marginHorizontal: 7  },
  logoutButton: { backgroundColor: 'green', padding: 15, marginTop: 20, borderRadius: 50, width: "50%" },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: 20, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', borderBottomWidth: 1, marginBottom: 15, padding: 5 },
  saveButton: { backgroundColor: 'green', padding: 10, borderRadius: 25, width: '90%', alignItems: 'center' },
  saveText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
