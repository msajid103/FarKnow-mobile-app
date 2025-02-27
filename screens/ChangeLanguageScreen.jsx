import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ChangeLanguageScreen = ({route, navigation }) => {
  const [isEnglishEnabled, setIsEnglishEnabled] = useState(true);
  const [isUrduEnabled, setIsUrduEnabled] = useState(false);

  const toggleEnglish = () => {
    setIsEnglishEnabled(!isEnglishEnabled);
    if (!isEnglishEnabled) setIsUrduEnabled(false);
  };

  const toggleUrdu = () => {
    setIsUrduEnabled(!isUrduEnabled);
    if (!isUrduEnabled) setIsEnglishEnabled(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Centered Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.centeredLogo}
      />

      {/* Card with Language Toggles */}
      <View style={styles.card}>
        <View style={styles.languageItem}>
          <Text style={styles.languageText}>English</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={isEnglishEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleEnglish}
            value={isEnglishEnabled}
            style={styles.switch}
          />
        </View>
        <View style={[styles.languageItem, styles.lastLanguageItem]}>
          <Text style={styles.languageText}>Urdu</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={isUrduEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleUrdu}
            value={isUrduEnabled}
            style={styles.switch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  greenHeader: {
    height: height * 0.12,
    backgroundColor: "#32CD32",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width: "100%",
    position: "absolute",
    top: 0,
  },

  backButton: {
    marginRight: width * 0.02,
    top: height * 0.017, // Centers vertically with adjustment
  },
  headerTitle: {
    fontSize: width * 0.05, // Scales with screen width (~20px on 400px wide screen)
    fontWeight: "700",
    top: height * 0.016,
    paddingRight: 28, // Centers vertically with adjustment
    color: "black",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5, // Adds elegance
  },
  centeredLogo: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // Maintains aspect ratio (assuming square logo)
    position: "absolute",
    top: height * 0.45, // Centers vertically with adjustment
    left: "50%",
    transform: [{ translateX: -(width * 0.6) / 2 }], // Centers horizontally
    zIndex: 0, // Below card and header
    opacity: 0.9, // Subtle transparency for blending
  },
  card: {
    backgroundColor: "rgba(255, 235, 59, 0.25)", // Softer transparent yellow
    borderRadius: 25,
    borderColor: "#FFD700", // Brighter yellow border (gold)
    borderWidth: 2,
    marginHorizontal: width * 0.05, // Scales with screen width
    marginTop: height * 0.25, // Scales with screen height
    paddingVertical: height * 0.05, // Scales padding
    paddingHorizontal: width * 0.06, // Scales padding
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1, // Above logo
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.03, // Scales with screen height
    paddingHorizontal: width * 0.06, // Scales with screen width
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 215, 0, 0.5)", // Subtle gold divider
  },
  lastLanguageItem: {
    borderBottomWidth: 0, // No border on the last item
  },
  languageText: {
    fontSize: width * 0.05, // Scales with screen width (~18px on 400px wide screen)
    color: "#333", // Softer black for elegance
    fontWeight: "600", // Slightly bold for prominence
    letterSpacing: 0.5,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Larger toggles for better touch
  },
});

export default ChangeLanguageScreen;