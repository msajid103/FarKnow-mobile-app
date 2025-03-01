import {
  Alert,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { registerUser } from "../firebase/authService";
import { createUserDocument } from "../firebase/firestoreService";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const user = await registerUser(email, password, confirmPassword)
      await createUserDocument(user.uid, user.email, name);
      Alert.alert("Success", "Email verified! You can now log in.");
      setLoading(false);
      navigation.navigate("Login");
    } catch (e) {
      setLoading(false);
      if (e.code === "auth/email-already-in-use") {
        Alert.alert("Already Exists", "This email already in use.");
      } else if (e.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "Please enter a valid email.");
      } else if (e.code === "auth/network-request-failed") {
        Alert.alert("No Internet", "Check Your Internet Connectivity");
      } else if (e.code === "auth/weak-password") {
        Alert.alert("Weak Password", "The password should be at least 6 characters long ");
      }
      else {
        Alert.alert("Error", e.message);
      }
    }
  }

  return (
    <ImageBackground
      source={require("../assets/background.png")}
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
          <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.btn_text}>Sign Up</Text>
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={{ fontSize: 17 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "black",
                  paddingBottom: 2,
                  fontSize: 17,
                }}
              >
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
    alignItems: "center",
  },
  btn_text: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default RegisterScreen;
