import axios from 'axios';
import { useEffect, useRef, useState, } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import {
  LargeText,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../../components';
import apiUrl from '../../../../config';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

const GetHelp = ({ navigation, route }: any) => {
  const userdata = route.params.userdata;
  const userName = `${userdata?.firstName} ${userdata?.lastName}`;
  const userImage = userdata?.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = useRef<FlatList>(null);

  const firstMessageTime = messages && messages.length > 0
      ? new Date(messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  // Default static message
  const defaultMessage = [{
    _id: 'defaultMessage', // Unique identifier
    messageText: [{
      sender: 'support',
      message: `Hi, how may I help you? `,
        }],
    sender: 'support',
    createdAt: new Date().toISOString(), // Ensure it's a string for consistency
  }];

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getHelpMessages/${userdata._id}`);
      setMessages(response.data);
    } catch (error) {
      console.log('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);  
  // Handle sending a message
  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        _id: new Date().toISOString(), // Unique ID for the new message
        messageText: [{
          sender: 'user',
          message: message,
          createdAt: new Date().toISOString(), 
        }],
        sender: userdata.userType,
        createdAt: new Date().toISOString(), // Format as string
      };

      // Optimistically add message to local state
      setMessages(prevMessages => [...prevMessages, newMessage]);

      try {
        // Send the message to the backend
        await axios.post(`${apiUrl}/sendHelpMessage`, {
          userId: userdata._id,
          sender: userdata.userType,
          messageText: {
            sender: 'user',
            message: message, 
          },
        });
      } catch (error) {
        console.log('Error sending message:', error);
      }

      setMessage('');
    }
  };

  const renderMessage = ({ item }: any) => {
    const messageArray = item.messageText?.length ? item.messageText : [];
    return messageArray.map((messageItem: any, index: number) => {
      const isUser = messageItem.sender === 'user';
      return (
        <View key={`${item._id}-${index}`} style={[styles.messageContainer, isUser ? styles.userMessage : styles.supportMessage]}>
          <Text style={styles.messageText}>{messageItem.message}</Text>
          <Text style={styles.timestampText}>{messageItem.createdAt ? new Date(messageItem.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : firstMessageTime}</Text>
        </View>
      );
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>Get Help</LargeText>}
        />
      )}
    >
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={'padding'}
        keyboardVerticalOffset={0}
      >
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image source={{ uri: userImage }} style={styles.profileImage} />
          <View>
            <LargeText size={3.4}>{userName}</LargeText>
            <SmallText size={3}>{userdata?.email}</SmallText>
          </View>
        </View>

        <FlatList
  ref={flatListRef}
  data={[...defaultMessage, ...messages]}
  renderItem={renderMessage}
  keyExtractor={(item) => item._id}
  contentContainerStyle={[styles.chatContainer, { paddingBottom: 10 }]}
  onContentSizeChange={() => {
  setTimeout(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, 100);
}}
  onLayout={() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });  // Ensure scroll to end on layout
    }
  }}
  showsVerticalScrollIndicator={false} // Hide the scroll bar for a cleaner look
  initialNumToRender={4} 
/>

        {/* Message input */}
        <View style={styles.inputOuterContainer}>
        <SmallText size={2.6} color='red'>Please leave your message, and our support team will connect with you shortly.</SmallText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={AppColors.grey}
            value={message}
            onChangeText={setMessage}
          />
          <Pressable onPress={sendMessage} style={styles.sendButton}>
            <SmallText color={AppColors.white} size={3}>Send</SmallText>
          </Pressable>
        </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default GetHelp;
