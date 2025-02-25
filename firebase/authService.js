import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const loginUser = async (email, password) => {
    try {
        if (!email.trim() || !password.trim()) {
            throw new Error("Please enter email and password");
        }
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (!user.emailVerified) {
            await auth().signOut();
            throw new Error("Email not verified. Please verify your email first.");
        }
        return user;
    } catch (error) {
        throw error;
    }
};


export const registerUser = async (email, password, confirmPassword) => {
    try {
        if (confirmPassword.trim() === "" || email.trim() === "" || password.trim() === "") {
            throw new Error("Please fill out all fields");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await user.sendEmailVerification()
        Alert.alert(
            "Verify Your Email",
            "A verification email has been sent to your email address. Please verify before logging in.",
            [{ text: "OK" }]
        );
        return new Promise((resolve, reject) => {
            const checkVerification = setInterval(async () => {
                await user.reload();
                if (auth().currentUser.emailVerified) {
                    clearInterval(checkVerification);
                    resolve(user); 
                }
            }, 3000);
        });        
    } catch (error) {
        throw error;
    }
};


export const logoutUser = async () => {
    try {
        await auth().signOut();
    } catch (error) {
        throw error;
    }
};
