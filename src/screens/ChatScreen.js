import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttachmentMenu from '../components/AttachmentMenu';
import AdBanner from '../components/AdBanner';
import AIService from '../services/AIService';

const { width, height } = Dimensions.get('window');

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();
  
  const { userType, email, name, userPoints } = route.params || {};

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: 'شكراً لك على رسالتك. أنا هنا لمساعدتك في أي استفسار تحتاجه.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleAttachment = (type) => {
    setShowAttachmentMenu(false);
    
    switch (type) {
      case 'camera':
        handleCamera();
        break;
      case 'image':
        handleImagePicker();
        break;
      case 'document':
        handleDocumentPicker();
        break;
      case 'video':
        handleVideoPicker();
        break;
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('خطأ', 'نحتاج إلى إذن الكاميرا');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageMessage = {
        id: Date.now(),
        text: 'تم إرسال صورة',
        isBot: false,
        timestamp: new Date(),
        image: result.assets[0].uri,
      };
      setMessages(prev => [...prev, imageMessage]);
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageMessage = {
        id: Date.now(),
        text: 'تم إرسال صورة',
        isBot: false,
        timestamp: new Date(),
        image: result.assets[0].uri,
      };
      setMessages(prev => [...prev, imageMessage]);
    }
  };

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const docMessage = {
          id: Date.now(),
          text: `تم إرسال ملف: ${result.assets[0].name}`,
          isBot: false,
          timestamp: new Date(),
          document: result.assets[0],
        };
        setMessages(prev => [...prev, docMessage]);
      }
    } catch (error) {
      Alert.alert('خطأ', 'فشل في اختيار الملف');
    }
  };

  const handleVideoPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const videoMessage = {
        id: Date.now(),
        text: 'تم إرسال فيديو',
        isBot: false,
        timestamp: new Date(),
        video: result.assets[0].uri,
      };
      setMessages(prev => [...prev, videoMessage]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderMessage = (message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isBot ? styles.botMessage : styles.userMessage
      ]}
    >
      <View style={[
        styles.messageBubble,
        message.isBot ? styles.botBubble : styles.userBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isBot ? styles.botText : styles.userText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.messageTime,
          message.isBot ? styles.botTime : styles.userTime
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={24} color="#2c2c2c" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Manus</Text>
          <View style={styles.pointsDisplay}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.pointsText}>{userPoints}</Text>
          </View>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#2c2c2c" />
        </TouchableOpacity>
      </View>

      {/* Ad Banner */}
      <AdBanner />

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(renderMessage)}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.typingText}>يكتب...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={inputText.trim() ? "#fff" : "#ccc"} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.attachButton}
          onPress={() => setShowAttachmentMenu(true)}
        >
          <Ionicons name="add" size={20} color="#2c2c2c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.voiceButton}>
          <Ionicons name="mic" size={20} color="#2c2c2c" />
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="اكتب رسالتك هنا..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          textAlign="right"
          onSubmitEditing={sendMessage}
        />
      </View>

      {/* Attachment Menu Modal */}
      <Modal
        visible={showAttachmentMenu}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAttachmentMenu(false)}
      >
        <AttachmentMenu
          onSelect={handleAttachment}
          onClose={() => setShowAttachmentMenu(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  pointsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2c2c2c',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: '#2c2c2c',
    textAlign: 'right',
  },
  userText: {
    color: '#fff',
    textAlign: 'right',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  botTime: {
    color: '#999',
    textAlign: 'right',
  },
  userTime: {
    color: '#ccc',
    textAlign: 'right',
  },
  typingText: {
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#2c2c2c',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
  },
});

export default ChatScreen;