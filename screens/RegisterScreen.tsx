import {
    Alert,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import auth from "@react-native-firebase/auth";
  import firestore from "@react-native-firebase/firestore";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../App";
  
  type SignUpProps = NativeStackScreenProps<RootStackParamList, "SignUp">;
  
  const RegisterScreen = ({ navigation }: SignUpProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    function handleRegister() {
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        Alert.alert("Error", "Please fill out all fields", [{ text: "OK" }]);
        return;
      }
  
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
  
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const userId = userCredential.user.uid;
  
          // Create user in Firestore with the updated schema
          return firestore().collection("Users").doc(userId).set({
            name: name.trim(),
            email: email.trim(),
            imageUrl: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png", // Default image URL
            friends: [], // No friends initially
            friendRequests: {
              sent: [], // Empty sent requests
              received: [], // Empty received requests
            },
            chats:[],
            createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp for creation
            updatedAt: firestore.FieldValue.serverTimestamp(), // Timestamp for last update
          });
        })
        .then(() => {
          Alert.alert(
            "Registration Successful",
            "You have registered successfully!",
            [{ text: "OK", onPress: () => navigation.navigate("Login") }],
            { cancelable: false }
          );
        })
        .catch((e) => {
          if (e.code === "auth/email-already-in-use") {
            Alert.alert("Already Exists", "This email is already in use.");
          } else if (e.code === "auth/invalid-email") {
            Alert.alert("Invalid Email", "Please enter a valid email.");
          } else {
            Alert.alert("Registration Failed", `Error: ${e.message}`);
          }
        });
    }
  
    return (
      <ImageBackground
        source={require("../assets/background.png")} // Background image path
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              padding: 10,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.TextHeading}>Sign Up</Text>
              <Text style={styles.Text}>Create Your New Account</Text>
            </View>
            <TextInput
              value={name}
              onChangeText={setName}
              style={[styles.InputPlaceholder, { marginTop: 40 }]}
              placeholder="Enter Your Full Name"
            />
  
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.InputPlaceholder}
              placeholder="Enter Your Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
  
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={styles.InputPlaceholder}
              placeholder="Enter Password"
            />
  
            <TextInput
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              style={styles.InputPlaceholder}
              placeholder="Confirm Your Password"
            />
            <TouchableOpacity style={styles.btn} onPress={handleRegister}>
              <Text style={styles.btn_text}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <Text style={{ fontSize: 17 }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    color: "black",
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    paddingBottom: 2,
                    fontSize: 17,
                  }}
                >
                  {" "}
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    mainContainer: {
      marginTop: 90,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    TextHeading: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
    },
    Text: {
      color: "black",
      fontSize: 17,
      marginTop: 15,
    },
    InputPlaceholder: {
      color: "black",
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      marginVertical: 10,
      width: 300,
    },
    btn: {
      backgroundColor: "orange",
      width: 200,
      padding: 15,
      marginTop: 50,
      borderRadius: 6,
    },
    btn_text: {
      color: "white",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "600",
    },
  });
  
  export default RegisterScreen;
  