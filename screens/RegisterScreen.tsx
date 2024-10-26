import { Alert, Text, StyleSheet, View, TouchableOpacity, TextInput, Pressable, ScrollView } from 'react-native';
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
                    posts:[],
                    friends:[],
                    sendedFriendsRequest:[],
                    receivedFriendsRequest:[],
                })
               
            })
            .then(()=>{
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 10 }}>
                <View style={styles.container}>
                    <Text style={styles.TextHeading}>Sign Up</Text>
                    <Text style={styles.Text}>Create Your New Account</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.InputText}>Full Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Your Full Name'
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Your Email'
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Password</Text>
                    <TextInput
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Password'
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Confirm Password</Text>
                    <TextInput
                        value={confirmPassword}
                        secureTextEntry
                        onChangeText={setConfirmPassword}
                        style={styles.InputPlaceholder}
                        placeholder='Confirm Your Password'
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <Text style={styles.btn_text}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate("Login")}>
                    <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        Already have an account? <Text style={{ color: '#4A55A2' }}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextHeading: {
        color: '#4A55A2',
        fontSize: 20,
        fontWeight: '600',
    },
    Text: {
        color: 'black',
        fontSize: 17,
        fontWeight: '600',
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
        marginVertical: 5,
        width: 300
    },
    btn: {
        backgroundColor: '#4A55A2',
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
