import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { logoutUser } from "../firebase/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';



const MenuScreen = ({route, navigation }) => {
  const { userData } = route.params;
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled((prevState) => !prevState);

  const handleLogout = async () => {
    try {
      logoutUser();
      await AsyncStorage.removeItem('userId'); 
      navigation.replace('Auth'); 
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while logging out.');
      console.error('Logout Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBackground}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      
      <View style={styles.card}>     
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userData.imageUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData.name}</Text>
        </View>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile",{userData})}  style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Password</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Language</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

      
        {/* <Text style={styles.sectionTitle}>More</Text> */}

        <TouchableOpacity style={styles.menuItem} onPress={()=> navigation.navigate('About')}>
          <Text style={styles.menuText}>About Us</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]}>
          <Text style={styles.menuText}>Terms and Conditions</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.lastMenuItem]} onPress={handleLogout}>
          <Text style={styles.menuText}>Logout</Text>
          <Icon name="chevron-right" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  greenBackground: {
    height: height * 0.25,
    backgroundColor: "#32CD32",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.03,
    flexDirection: "row",
    paddingHorizontal: width * 0.04,
    borderBottomLeftRadius: 20, // Smoother transition to card
    borderBottomRightRadius: 20,
    shadowColor: "#000", // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    position: "absolute",
    left: width * 0.05,
    top: height * 0.07,
  },
  menuTitle: {
    fontSize: width * 0.07, // Larger and bold for prominence
    fontWeight: "600",
    color: "black",
    textAlign: "center",
    letterSpacing: 1.1, // Adds elegance
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: -(height * 0.07),
    marginHorizontal: width * 0.04,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Prominent shadow for Android
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  profileImage: {
    width: width * 0.14, // Slightly larger for better visibility
    height: width * 0.14,
    borderRadius: width * 0.07,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "#FF0000",
  },
  profileName: {
    fontSize: width * 0.05, // Slightly larger for emphasis
    fontWeight: "700",
    marginTop: height * 0.015,
    color: "#333", // Softer black for elegance
  },
  sectionTitle: {
    fontSize: width * 0.047,
    fontWeight: "600",
    color: "#555", // Slightly darker grey for contrast
    marginTop: height * 0.025,
    marginBottom: height * 0.01,
    letterSpacing: 0.4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02, // More padding for touch comfort
    borderBottomWidth: 2, // Dividing line
    borderBottomColor: "#E0E0E0", // Light grey for subtlety
  },
  lastMenuItem: {
    borderBottomWidth: 0, // Remove border for the last item
  },
  menuText: {
    fontSize: width * 0.04, // Slightly larger for readability
    color: "#333", // Softer black
    fontWeight: "500", // Medium weight for balance
  },
});

export default MenuScreen;