import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Error", "Please enter email and password", [{ text: "OK" }]);
            return;
        }

        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async(userCredential) => {
                const user = userCredential.user;
                if (!user.emailVerified) {
                    setLoading(false);
                    Alert.alert("Invalid Credentials", "Wrong Email or Password", [{ text: "OK" }]);
                    auth().signOut();
                    return;
                }

                const userId = user.uid;
                const userDocRef = firestore().collection("Users").doc(userId);

                // Check if user document exists
                const userDoc = await userDocRef.get();

                if (!userDoc.exists) {
                    // Create new user document
                    await userDocRef.set({
                        name: user.displayName ? user.displayName.trim() : "New User",
                        email: user.email.trim(),
                        imageUrl: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
                        friends: [],
                        friendRequests: {
                            sent: [],
                            received: [],
                        },
                        chats: [],
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                    });
                }
                setLoading(false);
                navigation.navigate("Home", { userId });
            })
            .catch(e => {
                setLoading(false);
                if (e.code === "auth/invalid-credential") {
                    Alert.alert("Invalid Credentials", "Wrong Email or Password");
                } else if (e.code === "auth/network-request-failed") {
                    Alert.alert("No Internet", "Check Your Internet Connectivity");
                } else {
                    Alert.alert("Login Failed", `Error: ${e.message}`);
                }
            });
    }


    return (
        <ImageBackground
            source={require('../assets/background.png')} // Path to your background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 10 }}>
                    <View style={styles.container}>
                        <Text style={styles.TextHeading}>Sign In</Text>
                    </View>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={[styles.InputPlaceholder, { marginTop: 40 }]}
                        placeholder='Enter Your Email'
                    />

                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Password'
                    />

                    <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.btn_text}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ fontSize: 17 }}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={styles.signUpText}> Sign Up</Text>
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    mainContainer: {
        marginTop: 90,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeading: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    InputPlaceholder: {
        color: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        width: 300,
    },
    btn: {
        backgroundColor: 'orange',
        width: 200,
        padding: 15,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6,
        alignItems: 'center',
    },
    btn_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotPasswordText: {
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 17,
    },
    signUpText: {
        color: 'black',
        paddingBottom: 2,
        fontSize: 17,
    },
});

export default LoginScreen;
