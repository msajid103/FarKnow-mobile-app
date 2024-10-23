import { Text, StyleSheet, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, {useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type SigUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>
const RegisterScreen = ({navigation}: SigUpProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, alignItems: 'center' }}>
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <Text style={styles.TextHeading}>Sign Up</Text>
                    <Text style={styles.Text} >Create Your New Account </Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <Text style={styles.InputText}>Full Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Your Full Name' />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Your Email' />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Password</Text>
                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.InputPlaceholder}
                        placeholder='Enter Password' />
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.InputText}>Confirm Password</Text>
                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.InputPlaceholder}
                        placeholder='Confirm Your Password' />
                </View>
                <Pressable style={styles.btn}
                 onPress={()=>{
                    navigation.navigate("Login")
                }}>
                    <Text style={styles.btn_text}>
                        Sign Up
                    </Text>
                </Pressable>
                <Pressable style={{marginTop: 20 }}
                   onPress={()=>{
                    navigation.navigate("Login")
                }}>
                    <Text style={{ textAlign: 'center', fontSize:17}}>
                        Already have account? <Text style={{ color: '#4A55A2' }}>Sign In</Text>
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </View>
    )

}
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


export default RegisterScreen;