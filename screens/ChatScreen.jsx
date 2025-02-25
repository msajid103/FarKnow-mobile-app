import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = ({ route }) => {
    const { chatId, userName, userProfilePic, userId } = route.params;
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('Chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                const fetchedMessages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(fetchedMessages);
            });

        return () => unsubscribe();
    }, [chatId]);

    // Send message handler
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            sender: userId,
            content: newMessage,
            timestamp: firestore.Timestamp.now(),
        };

        await firestore()
            .collection('Chats')
            .doc(chatId)
            .collection('messages')
            .add(messageData);

        await firestore()
            .collection('Chats')
            .doc(chatId)
            .update({
                lastMessage: newMessage,
                updatedAt: firestore.Timestamp.now(),
            });

        setNewMessage('');
    };

    // Render a single message
    const renderMessage = ({ item }) => {
        const isSelf = item.sender === userId;
        return (
            <View style={[styles.messageContainer, isSelf ? styles.selfMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.content}</Text>
                <Text style={styles.timestamp}>
                    {item.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    // Header with profile picture and name
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: () => (
    //             <View style={styles.headerContainer}>
    //                 <Image source={{ uri: userProfilePic }} style={styles.headerProfilePic} />
    //                 <Text style={styles.headerUserName}>{userName}</Text>
    //             </View>
    //         ),
    //         headerStyle: {
    //             backgroundColor: '#128C7E', // WhatsApp-like color
    //             height: 80,
    //         },
    //         headerTitleAlign: 'left',
    //     });
    // }, [navigation, userName, userProfilePic]);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
        >
            <View style={styles.header}>
                {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity> */}
                <Image source={{ uri: userProfilePic }} style={styles.headerProfilePic} />
                <Text style={styles.headerUserName}>{userName}</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                    {/* <Ionicons name="send" size={20} color="#fff" /> */}
                    <Text style={{
                        color: '#FFF',
                        fontWeight: 'bold',
                    }}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    chatList: {
        paddingHorizontal: 10,
    },
    messageContainer: {
        maxWidth: '80%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    selfMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    timestamp: {
        fontSize: 10,
        color: '#555',
        textAlign: 'right',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginRight: 10,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: 'orange',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        height: 80,
    },
    headerProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
    headerUserName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
});

export default ChatScreen;
