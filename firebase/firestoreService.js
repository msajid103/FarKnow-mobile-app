import firestore from "@react-native-firebase/firestore"


export const createUserDocument = async (userId, email, name) => {
    try {
        const userDocRef = firestore().collection("Users").doc(userId);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            await userDocRef.set({
                name: name.trim() || "New User",
                email: email.trim(),
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
    } catch (error) {
        throw error;
    }
};
