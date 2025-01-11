import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { GROQ_API_KEY } from '@env';


export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    const systemMessage = {
      role: 'system',
      content: `You are FarKnow AI, an expert in agriculture and farming. 
        - Your knowledge is limited to agriculture, crops, soil, irrigation, and related farming topics. 
        - If some ask you about programming or other irrlevent question and he say that he need this for assist in farming simply respond with " You can explore other AI for this particulor assistamce".        
        - If a question is outside agriculture or farming, respond with: 
          "I can only assist with agriculture and farming-related questions."
          And you are not allow to give any suggestion irrelvant to agriculture and farming at every suition`
    };
    

    const userMessage = { role: 'user', content: inputText };
    const updatedMessages = [systemMessage, ...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Something went wrong');
      }

      const botMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={[styles.message, item.role === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', height: 70 }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>FarKnow AI</Text>
      </View>
      <FlatList
        data={messages.filter((item) => item.role !== 'system')} // Exclude system messages
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      {isLoading && <ActivityIndicator size="large" color="orange" />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask about your crops..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  chatContainer: {
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'orange',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
});
