import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Pressable, Alert, ImageBackground } from 'react-native'
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
            <View  style={styles.mainContainer}>

                <KeyboardAvoidingView>
                    <View style={styles.container}>
                    
                            <Text style={styles.TextHeading}>Sign In</Text>
                    
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <Text style={styles.InputText}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.InputPlaceholder}
                            placeholder='Enter Your Email' />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.InputText}>Password</Text>
                        <TextInput
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.InputPlaceholder}
                            placeholder='Enter Password' />
                    </View>
                    <Pressable style={styles.btn}
                        onPress={() => handleLogin()}>
                        <Text style={styles.btn_text}>
                            Login
                        </Text>
                    </Pressable>
                    <Pressable style={{ marginTop: 20 }}
                        onPress={() => {
                            navigation.navigate("SignUp")
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 17 }}>
                            Don't have an account? <Text style={{ color: 'black' }}>Sign Up</Text>
                        </Text>
                    </Pressable>

                </KeyboardAvoidingView>
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
    mainContainer:{
        marginTop:90,
        padding:20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',        
        backgroundColor: 'white',
        borderRadius:20,
        
      
    },
    container: {      
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
        width: 300

    },
    btn: {
        backgroundColor: '#4A55A2',
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