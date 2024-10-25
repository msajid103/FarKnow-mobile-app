import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>
const LoginScreen = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 150, alignItems: 'center' }}>
          
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('Splash')
                        }}>
                        <Text style={styles.TextHeading}>Sign In</Text>
                    </Pressable>
                    <Text style={styles.Text} >Sign In to Your Account </Text>
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
                    onPress={() => {
                        navigation.navigate("Home", {
                            userId: '3443'
                        })
                    }}>
                    <Text style={styles.btn_text}>
                        Login
                    </Text>
                </Pressable>
                <Pressable style={{ marginTop: 20 }}
                    onPress={() => {
                        navigation.navigate("SignUp")
                    }}>
                    <Text style={{ textAlign: 'center', fontSize: 17 }}>
                        Don't have an account? <Text style={{ color: '#4A55A2' }}>Sign Up</Text>
                    </Text>
                </Pressable>

            </KeyboardAvoidingView>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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
        marginVertical: 10,
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