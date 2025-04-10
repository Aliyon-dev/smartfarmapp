import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Vibration,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../../components/elements/inputField';
import { Button } from '../../components/elements/Button';

const { width } = Dimensions.get('window');

const chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);
  const flatListRef = useRef(null);

  useEffect(() => {
    const token = getToken();
    console.log(typeof(token));
    if(!token){
      return
    }
    const ws = new WebSocket(`ws://13.48.30.229:8001/ws/chatbot/?token=${JSON.stringify(token)}`);
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    

  }, []);

  const getToken =  async () =>{
    const token = await AsyncStorage.getItem('userToken');
    console.log("this is the :",token);
    return JSON.stringify(token);
  }

  const StartSocket =  async () =>{
    try{
      const ws = new WebSocket(`ws://13.`)
    }
    catch(error){
      console.log("error")
    }
    finally{
      console.log("finally")
    }
  }

  
  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const handleInputChange = (text) => {
    setInput(text);
    // Update input height based on content
    const numLines = text.split('\n').length;
    const newHeight = Math.min(40 + (numLines - 1) * 20, 100);
    setInputHeight(newHeight);
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    Vibration.vibrate(10); // Haptic feedback
    Keyboard.dismiss();

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveMessages(newMessages);
    setInput('');
    setInputHeight(40); // Reset input height
    setIsLoading(true);

    try {
      // Simulate AI response - Replace with actual API call
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: "I'm a sample AI response. Replace this with actual API integration.",
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        const updatedMessages = [...newMessages, aiMessage];
        setMessages(updatedMessages);
        saveMessages(updatedMessages);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }) => (
    <View 
      style={[
        styles.messageBubble, 
        item.role === 'user' ? styles.userMessage : styles.aiMessage
      ]}
    >
      <Text 
        style={[
          styles.messageText,
          item.role === 'user' ? styles.userMessageText : styles.aiMessageText
        ]}
      >
        {item.content}
      </Text>
      <Text style={[
        styles.timestampText,
        item.role === 'user' ? styles.userTimestamp : styles.aiTimestamp
      ]}>
        {formatTimestamp(item.timestamp)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={styles.header}>
          <View style={{flexDirection:'row', gap: 16}}>
            <Image
            style={{height: 44, width: 44}}
            source={require("../../assets/icons/terra.png")}/>

          <View>
            <Text style-={{fontSize: 16, fontWeight: '800'}}>
              Terra Bot
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 4}}>
              <View style={{ backgroundColor: '#7DDE86',width: 6, height: 6, borderRadius: 200, marginBottom: 5}}></View>
              <Text style={{fontSize:12}}>Ready to Assist</Text>
            </View>

          </View>

          </View>

       
          <View style={{justifyContent: 'center', alignItems:'center', height: 44, width: 44,borderRadius: 200, borderWidth: 1.5, borderColor:'#72777A', backgroundColor:'#ffffff'}}>
            <TouchableOpacity>
              <Image
                style={{height: 32, width: 32}}
                source={require("../../assets/dots.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList

          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={handleInputChange}
              placeholder="Type a message..."
              placeholderTextColor="#666666"
              fontSize={14}
              multiline
              maxHeight={100}
              textAlignVertical="center"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity 
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={handleSubmit}
            disabled={!input.trim() || isLoading}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Image
                style={{height: 28, width:28}}
                source={require("../../assets/Iconly/send.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: 'white',
    marginTop: 44,
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerLoader: {
    marginLeft: 10,
  },
  messageList: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  messageListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    maxWidth: width * 0.8,
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0284c7',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#333333',
  },
  timestampText: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  aiTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 116,
  },
  inputWrapper: {
    flex: 1,
    borderColor: "#979C9E",
    borderWidth: 1.5,
    borderRadius: 40,
    height: 52,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    height: 52,
    borderColor: '#979C9E',
    borderRadius: 44,
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#5344C2',
    borderRadius: 200,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
  },
  sendButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default chatbot;