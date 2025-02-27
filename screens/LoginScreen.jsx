import { Text, StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { loginUser } from '../firebase/authService';
import { createUserDocument } from '../firebase/firestoreService';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const user = await loginUser(email, password);
            await createUserDocument(user.uid, user.email, user.displayName || "New User");
            await AsyncStorage.setItem('userId', JSON.stringify(user.uid));
            setLoading(false);
            navigation.replace('App'); 

        } catch (e) {
            setLoading(false);
            if (e.code === "auth/network-request-failed") {
                Alert.alert("No Internet", "Check Your Internet Connectivity");
            } else {
                Alert.alert("Invalid Credentials", "Wrong Email or Password");
            }
        }
    };

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
