import { Alert, Text, StyleSheet, View, TouchableOpacity, ImageBackground, TextInput, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const RegisterScreen = ({ navigation }: SignUpProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleRegister() {
        if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
            Alert.alert("Error", "Please enter email and password", [
                { text: "OK" }
            ]);
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid
                return firestore().collection('Users').doc(userId).set({
                    name,
                    email,
                    imageUrl: '',
                    posts: [],
                    friends: [],
                    sendedFriendsRequest: [],
                    receivedFriendsRequest: [],
                })

            })
            .then(() => {
                Alert.alert(
                    "Registration Successful",
                    "You have registered successfully!",
                    [
                        { text: "OK", onPress: () => navigation.navigate("Login") }
                    ],
                    { cancelable: false }
                );
            })
            .catch(e => {
                if (e.code === 'auth/email-already-in-use') {
                    Alert.alert("Already Exist", "This Email Already in Use.");
                } else if (e.code === 'auth/invalid-email') {
                    Alert.alert("Invalid Email", "Enter a Valid Email.");
                } else {
                    Alert.alert("Registration Failed", `Error: ${e.message}`);
                }
            });
    }

    return (
        <ImageBackground
            source={require('../assets/background.png')} // Path to your background image
            style={styles.background}
            resizeMode="cover" // or "stretch" or "contain" depending on your needs
        >
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 10 }}>
                    <View style={styles.container}>
                        <Text style={styles.TextHeading}>Sign Up</Text>
                        <Text style={styles.Text}>Create Your New Account</Text>
                    </View>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={[styles.InputPlaceholder, { marginTop: 40 }]}
                        placeholder='Enter Your Full Name'
                    />

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Your Email'
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Password'
                    />


                    <TextInput

                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                        style={styles.InputPlaceholder}
                        placeholder='Confirm Your Password'
                    />
                    <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                        <Text style={styles.btn_text}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 30, }}>
                        <Text style={{fontSize: 17}} >
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{
                                color: 'black', borderBottomWidth: 1, borderBottomColor: 'gray',
                                paddingBottom: 2,
                                fontSize: 17, 
                            }}> Sign In</Text>
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
        justifyContent: 'space-evenly'

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
        alignItems: 'center'
    },
    TextHeading: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    Text: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'regular',
        marginTop: 15
    },
    InputText: {
        color: 'gray',
        fontSize: 18,
        fontWeight: '600'
    },
    InputPlaceholder: {
        color: 'black',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
        width: 300
    },
    btn: {
        backgroundColor: 'orange',
        width: 200,
        padding: 15,
        marginTop: 50,
        borderRadius: 6
    },
    btn_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    }
});

export default RegisterScreen;
