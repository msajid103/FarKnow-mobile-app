import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
// Sample data for chat messages
const initialMessages = [
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'Hey! How are you?', sender: 'self' },
    { id: '3', text: 'I\'m good, what about you?', sender: 'other' },
];
const ChatScreen = ({ route, navigation }) => {
    const { userName, userProfilePic } = route.params;
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    // Set the custom header with user's profile picture and name
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerContainer}>
                    <Image source={{ uri: userProfilePic }} style={styles.headerProfilePic} />
                    <Text style={styles.headerUserName}>{userName}</Text>
                </View>
            ),
            headerTitleAlign: 'start', 
        });
    }, [navigation, userName, userProfilePic]);

    // Function to handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const newMsg = { id: (messages.length + 1).toString(), text: newMessage, sender: 'self' };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const renderMessage = ({ item }) => {
        const isSelf = item.sender === 'self';
        return (
            <View style={[styles.messageContainer, isSelf ? styles.selfMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
        >
            {/* Chat Messages List */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
            />

            {/* Input Box and Send Button */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

// Styles for the chat screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    chatList: {
        paddingHorizontal: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    selfMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6', // Light green for own messages
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC', // Light gray for received messages
    },
    messageText: {
        fontSize: 16,
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
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        // justifyContent:'flex-end' ,
        alignItems: 'center',
    },
    headerProfilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerUserName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChatScreen;
