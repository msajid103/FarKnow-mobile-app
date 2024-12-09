import { Text, StyleSheet, View, ScrollView, TextInput, Pressable, Alert, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import { RootStackParamList } from '../App'
import { TouchableOpacity } from 'react-native-gesture-handler';
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>
const LoginScreen = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            Alert.alert("Error", "Please enter email and password", [
                { text: "OK" }
            ]);
            return;
        }
        auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                navigation.navigate("Home", { userId })
                return null
            })
            .catch(err => {
                Alert.alert('Invalid', "Wrong Password or Email", [
                    { text: "OK", onPress: () => navigation.navigate("Login") }
                ],
                    { cancelable: false })
            })
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
                        <Text style={styles.TextHeading}>Sign In</Text>
                    </View>

                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={[styles.InputPlaceholder, { marginTop: 40 }]}
                        placeholder='Enter Your Email' />


                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Password' />

                    <TouchableOpacity style={styles.btn}
                        onPress={() => handleLogin()}>
                        <Text style={styles.btn_text}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row',marginTop: 25,}}>
                        <Text style={{
                            fontFamily: 'Robot', color: 'black', borderBottomWidth: 1, borderBottomColor: 'gray',
                            
                            fontSize: 17,
                        }}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 15, }}>
                        <Text style={{ fontSize: 17 }} >
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={{
                                color: 'black', borderBottomWidth: 1, borderBottomColor: 'gray',
                                paddingBottom: 2,
                                fontSize: 17,
                            }}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </ImageBackground>
    )

}


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
        marginVertical: 10,
        width: 300

    },
    btn: {
        backgroundColor: 'orange',
        width: 200,
        padding: 15,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6

    },
    btn_text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    }
})


export default LoginScreen;