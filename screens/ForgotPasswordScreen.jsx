import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>    
      <Text style={styles.instructionText}>
        Please enter your email to reset the password
      </Text>

      {/* Email Input */}
      <Text style={styles.label}>Your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Illustration Image */}
      <Image source={require("../assets/logo.png")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  }, 
  instructionText: {
    fontSize: width * 0.04,
    color: "#888",
    marginTop: height * 0.25,
    textAlign: "center",
    paddingHorizontal: width * 0.05,
    zIndex: 5, // Above image, below input/button
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
    marginTop: height * 0.03,
    paddingLeft: width * 0.04,
    marginBottom: height * 0.005,
    zIndex: 5, // Above image
  },
  input: {
    width: "90%",
    height: height * 0.07,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.007,
    fontSize: width * 0.04,
    zIndex: 5, // Above image
  },
  button: {
    width: width * 0.8,
    backgroundColor: "#6dd100",
    paddingVertical: height * 0.02,
    borderRadius: 30,
    alignItems: "center",
    marginTop: height * 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 5, // Above image
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#000",
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    position: "absolute",
    top: height * 0.5,
    left: "50%",
    transform: [{ translateX: -(width * 0.6) / 2 }],
    zIndex: 0, // Keep image at the bottom of the stack
  },
});

export default ForgotPasswordScreen;