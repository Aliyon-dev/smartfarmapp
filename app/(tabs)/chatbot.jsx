
import { useRef, useEffect, useState } from "react"
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
  Image,
  Animated,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"
//import { useRef } from "react"

const { width } = Dimensions.get("window")
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)


const Chatbot = () => {
  const {userToken} =  useContext(UserContext);
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [inputHeight, setInputHeight] = useState(40)
  const flatListRef = useRef(null)
  const [isTyping, setIsTyping] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scrollY = useRef(new Animated.Value(0)).current
  const wsRef =  useRef(null)
  const [status, setStatus] =  useState("connecting")
  const typingAnim1 = useRef(new Animated.Value(0)).current
  const typingAnim2 = useRef(new Animated.Value(0)).current
  const typingAnim3 = useRef(new Animated.Value(0)).current
  

  // Sample initial messages
  useEffect(() => {
    clearChat()
    //loadMessages()
    // If no saved messages, add a welcome message
    setTimeout(() => {
      if (messages.length === 0) {
        const welcomeMessage = {
          id: Date.now().toString(),
          content: "Hello! I'm Terra Bot, your farming assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date().toISOString(),
        }
        setMessages([welcomeMessage])
        //saveMessages([welcomeMessage])
      }
    }, 500)

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  useEffect(() => {
    if (!userToken) return;
    
    const ws = new WebSocket(`wss://api.techiqsmart.farm/ws/chatbot/?token=${userToken}`)
    wsRef.current =  ws
    
    ws.onopen = () => {
      setStatus("connected")
      console.log("WebSocket connection opened")
    }

    ws.onmessage = (e) => {
      try{
        const data = JSON.parse(e.data)
        const { message } = data
        if ( (message) &&  message === "connected") {
          clearChat()
        }
        else{
          const aiMessage = {
            id: Date.now().toString(),
            content: message,
            role: "assistant",
            timestamp: new Date().toISOString(),
          }
          setMessages((prevMessages) => [...prevMessages, aiMessage])
          setIsLoading(false);
          setIsTyping(false);
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      }
      catch(error){
        console.log("Error parsing message:", error)
        setIsLoading(false);
        setIsTyping(false);
      }
    }

    ws.onerror = (error) => {
      console.log("WebSocket error:", error)
      setStatus("error")
      setIsLoading(false);
      setIsTyping(false);
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
      setStatus("disconnected")
    }
    
    return () => {
      ws.close()
    }
  }, [userToken])

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem("chatMessages")
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
    } catch (error) {
      console.error("Error loading messages:", error)
    }
  }

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem("chatMessages", JSON.stringify(newMessages))
    } catch (error) {
      console.error("Error saving messages:", error)
    }
  }

  const handleInputChange = (text) => {
    setInput(text)
    // Update input height based on content
    const numLines = text.split("\n").length
    const newHeight = Math.min(40 + (numLines - 1) * 20, 100)
    setInputHeight(newHeight)
  }

  const handleSubmit = async () => {
    if (!input.trim() || isLoading || !wsRef.current) return

    Vibration.vibrate(10) // Haptic feedback
    Keyboard.dismiss()
    const api_message = {"message": input}

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date().toISOString(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    saveMessages(newMessages)
    setInput("")
    setInputHeight(40) // Reset input height
    setIsLoading(true)
    setIsTyping(true)
    
    try {
      wsRef.current.send(JSON.stringify(api_message))
    } catch (error) {
      console.log("Error sending message:", error)
      setIsLoading(false)
      setIsTyping(false)
    }

    /* try {
      // Simulate AI response - Replace with actual API call
      setTimeout(() => {
        setIsTyping(false)
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content:
            "This is a test message, I will be able to help you with farming-related questions soon!",
          timestamp: new Date().toISOString(),
        }
        const updatedMessages = [...newMessages, aiMessage]
        setMessages(updatedMessages)
        saveMessages(updatedMessages)
        setIsLoading(false)
      }, 2000) 
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
      setIsTyping(false)
    }
    */
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const clearChat = () => {
    setMessages([])
    saveMessages([])

    // Add welcome message after clearing
    setTimeout(() => {
      const welcomeMessage = {
        id: Date.now().toString(),
        content: "Chat cleared. How else can I assist you with your farming needs?",
        role: "assistant",
        timestamp: new Date().toISOString(),
      }
      //setMessages([welcomeMessage])
      saveMessages([welcomeMessage])
    }, 300)
  }

  const renderMessage = ({ item, index }) => {
    const isLastMessage = index === messages.length - 1

    return (
      <Animated.View
        style={[
          styles.messageBubble,
          item.role === "user" ? styles.userMessage : styles.aiMessage,
          isLastMessage && { opacity: fadeAnim },
        ]}
      >
        {item.role === "assistant" && (
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={require("../../assets/icons/terra.png")} />
          </View>
        )}
        <View
          style={[styles.messageContent, item.role === "user" ? styles.userMessageContent : styles.aiMessageContent]}
        >
          <Text style={[styles.messageText, item.role === "user" ? styles.userMessageText : styles.aiMessageText]}>
            {item.content}
          </Text>
          <Text style={[styles.timestampText, item.role === "user" ? styles.userTimestamp : styles.aiTimestamp]}>
            {formatTimestamp(item.timestamp)}
          </Text>
        </View>
      </Animated.View>
    )
  }

  const startTypingAnimation = () => {
    const animateTyping = (animValue, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )
    }

    Animated.parallel([
      animateTyping(typingAnim1, 0),
      animateTyping(typingAnim2, 200),
      animateTyping(typingAnim3, 400),
    ]).start()
  }

  const stopTypingAnimation = () => {
    typingAnim1.stopAnimation()
    typingAnim2.stopAnimation()
    typingAnim3.stopAnimation()
    typingAnim1.setValue(0)
    typingAnim2.setValue(0)
    typingAnim3.setValue(0)
  }

  useEffect(() => {
    if (isTyping) {
      startTypingAnimation()
    } else {
      stopTypingAnimation()
    }
  }, [isTyping])

  const renderTypingIndicator = () => {
    if (!isTyping) return null

    return (
      <View style={[styles.messageBubble, styles.aiMessage]}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={require("../../assets/icons/terra.png")} />
        </View>
        <View style={[styles.messageContent, styles.aiMessageContent]}>
          <View style={styles.typingContainer}>
            <Animated.View 
              style={[
                styles.typingDot,
                {
                  opacity: typingAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]} 
            />
            <Animated.View 
              style={[
                styles.typingDot,
                {
                  opacity: typingAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]} 
            />
            <Animated.View 
              style={[
                styles.typingDot,
                {
                  opacity: typingAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ]} 
            />
          </View>
        </View>
      </View>
    )
  }

  const renderEmptyChat = () => {
    if (messages.length > 0) return null

    return (
      <View style={styles.emptyChatContainer}>
        <Image style={styles.emptyChatImage} source={require("../../assets/icons/terra.png")} />
        <Text style={styles.emptyChatTitle}>Terra Bot</Text>
        <Text style={styles.emptyChatSubtitle}>Your Farming Assistant</Text>
        <Text style={styles.emptyChatText}>
          Ask me about crop planning, weather forecasts, soil health, or any farming-related questions.
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.headerLogo} source={require("../../assets/icons/terra.png")} />
            <View>
              <Text style={styles.headerTitle}>Terra Bot</Text>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot,
                  {
                    backgroundColor: 
                      status === "connected" ? "#4CAF50" :
                      status === "connecting" ? "#FF9800" :
                      status === "error" ? "#F44336" :
                      "#9E9E9E"
                  }
                ]}></View>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.headerButton} onPress={clearChat}>
            <Image style={styles.headerButtonIcon} source={require("../../assets/dots.png")} />
          </TouchableOpacity>
        </View>

        <AnimatedFlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageListContent}
          // Unmount off-screen rows to save memory
          removeClippedSubviews={true}
          // Ensure smooth scroll events
          scrollEventThrottle={16}
          // Initial items to render
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={5}
          // Keep the bottom item visible when new content is added
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
          // Snap to bottom on size/layout changes
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={renderTypingIndicator}
        />

        <Animated.View
          style={[
            styles.inputContainer,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { height: Math.max(52, inputHeight) }]}
              value={input}
              onChangeText={handleInputChange}
              placeholder="Ask about farming..."
              placeholderTextColor="#888888"
              fontSize={16}
              multiline
              maxHeight={100}
              textAlignVertical="center"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              blurOnSubmit={false}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              !input.trim() && styles.sendButtonDisabled,
              input.trim() && styles.sendButtonActive,
            ]}
            onPress={handleSubmit}
            disabled={!input.trim() || isLoading}
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Image style={styles.sendIcon} source={require("../../assets/Iconly/send.png")} />
            )}
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 10 : 44,
    paddingBottom: 16,
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerLogo: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 13,
    color: "#666666",
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
  headerButtonIcon: {
    height: 24,
    width: 24,
    tintColor: "#555555",
  },
  messageList: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  messageListContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageBubble: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: width * 0.9,
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: "flex-start",
  },
  avatar: {
    height: 24,
    width: 24,
    borderRadius: 16,
  },
  messageContent: {
    padding: 12,
    borderRadius: 18,
    maxWidth: width * 0.75,
  },
  userMessage: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  userMessageContent: {
    backgroundColor: "#5344C2",
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    alignSelf: "flex-start",
  },
  aiMessageContent: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#ffffff",
  },
  aiMessageText: {
    color: "#333333",
  },
  timestampText: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
  },
  aiTimestamp: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "flex-end",
  },
  inputWrapper: {
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1.5,
    borderRadius: 24,
    backgroundColor: "#f9f9f9",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333333",
  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sendButtonActive: {
    backgroundColor: "#5344C2",
  },
  sendButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  sendIcon: {
    height: 24,
    width: 24,
    tintColor: "#ffffff",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 40,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginHorizontal: 3,
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginTop: 60,
  },
  emptyChatImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
    opacity: 0.9,
  },
  emptyChatTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  emptyChatSubtitle: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 16,
    fontWeight: "500",
  },
  emptyChatText: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
})

export default Chatbot
