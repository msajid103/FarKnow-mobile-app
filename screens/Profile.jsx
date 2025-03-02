import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, Dimensions } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUserData] = useState({
    name: "Sadaqat Rasool",
    age: "23",
    mobile: "705526209",
    village: "E-65, Phase-8, Industrial Area, Balongi, Sakesar, Punjab 404009",
    district: "Mianwali",
    area: "Chakralaa",
  });

  const pickImage = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={styles.container}>     
      <View style={styles.profileContainer}>
        <Image source={{ uri: userData.imageUrl }} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
          <Text style={styles.cameraText}>📷</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{userData.name}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Age: {user.age}</Text>
        <Text style={styles.label}>Mobile No: {user.mobile}</Text>
        <Text style={styles.label}>Village: {user.village}</Text>
        <Text style={styles.label}>District: {user.district}</Text>
        <Text style={styles.label}>Area: {user.area}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
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
            <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
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
  profileContainer: { marginTop: height * 0.076, alignItems: 'center' },
  profileImage: { width: width * 0.4, height: width * 0.4, borderRadius: width * 0.2 },
  cameraIcon: { position: 'absolute', bottom: 0, right: 10, backgroundColor: 'gray', borderRadius: 20, padding: 5 },
  name: { fontSize: width * 0.05, fontWeight: 'bold', marginTop: 20 },
  editText: { color: 'green', fontSize: width * 0.04, marginTop: 5 },
  infoContainer: { height:"35%",width: '90%', marginTop: height * 0.02, backgroundColor:"#F5E88E", justifyContent: 'center', alignItems: 'center', padding: width * 0.03, borderRadius: 20, borderColor: "yellow", borderWidth: 2 },
  label: { fontSize: width * 0.045, fontWeight: 'bold', marginVertical: 5 },
  logoutButton: { backgroundColor: "#32CD32", padding: height * 0.02, marginTop: height * 0.02, borderRadius: 50, width: "50%" },
  logoutText: { color: 'white', fontSize: width * 0.045, fontWeight: 'bold', textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '85%', backgroundColor: 'white', padding: width * 0.05, borderRadius: 15, alignItems: 'center' },
  modalTitle: { fontSize: width * 0.05, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', borderBottomWidth: 1, marginBottom: height * 0.02, padding: 5 },
  saveButton: { backgroundColor: 'green', padding: height * 0.015, borderRadius: 25, width: '90%', alignItems: 'center' },
  saveText: { color: 'white', fontSize: width * 0.04, fontWeight: 'bold' },
});

export default ProfileScreen;
