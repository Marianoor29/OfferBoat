import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import apiUrl from '../../config';
import AppColors from "../../utills/AppColors";
import CommonStyles from '../../utills/CommonStyles';
import { width } from "../../utills/Dimension";
import { LargeText, SmallText } from "../text";
import styles from "./styles";

type ReviewItemProps = {
  reviewerName: string;
  reviewerImage: string;
  reviewDate: string;
  reviewText: string;
  rating: number;
  replies?: { replierName: string; replyText: string; }[];
  ratingId: string; 
  bookingId: string;
  ownerId: any;
  userId: any;
  userType: string;
  showReplyBox?: boolean;
  onReplySubmit: (ratingId: string, newReply: any) => void;
};

const ReviewDetailCard = ({
  reviewerName,
  reviewerImage,
  reviewDate,
  reviewText,
  rating,
  replies = [],
  ratingId,
  bookingId,
  ownerId,
  userId,
  userType,
  showReplyBox = false,
  onReplySubmit,
}: ReviewItemProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const renderStars = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={width(4)} color={AppColors.starColor} />);
    }
    if (halfStar) {
      stars.push(<Icon key="half" name="star-half" size={width(4)} color={AppColors.starColor} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={width(4)} color={AppColors.starColor} />);
    }
    return stars;
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [loading, setLoading] = useState(false);
  const baseURL = apiUrl;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const truncatedText = isExpanded ? reviewText : `${reviewText.substring(0, 100)}...`;
  const fetchOwnerId = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setOwnerName(''); 
      return;
    }
    const response = await axios.get(`${baseURL}/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setOwnerName(`${response.data.firstName} ${response.data.lastName}`);
  };

  useFocusEffect(
    useCallback(() => {
      fetchOwnerId();
    }, [])
  );

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      return;
    }

    setLoading(true); // Show loader
    try {
      const response = await axios.post(`${baseURL}/rating/addReply`, {
        ratingId,
        replierName: ownerName,
        replyText,
        bookingId,
        ownerId,
        userId,
        userType,
      });

      if (response.status === 200) {
        const newReply = { replierName: ownerName, replyText };
        onReplySubmit(ratingId, newReply); // Call the callback function with the new reply
        setReplyText(''); // Clear the input field
        setShowReplies(true); // Show the new reply immediately
      } else {
        console.log('Failed to submit reply.');
      }
    } catch (error) {
      console.log('An error occurred while submitting your reply. Please try again later.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <View style={styles.reviewContainer}>
      <Image source={{ uri: reviewerImage }} style={styles.reviewerImage} />
      <View style={styles.reviewContent}>
        <LargeText size={4}>{reviewerName}</LargeText>
        <SmallText size={3.4} color={AppColors.grey} textStyles={CommonStyles.marginBottom_1}>{reviewDate}</SmallText>
        <View style={styles.Ratingcontainer}>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>
        <SmallText>{truncatedText}</SmallText>
        <TouchableOpacity onPress={toggleReadMore}>
          <Text style={styles.readMore}>{isExpanded ? 'Read Less' : 'Read More'}</Text>
        </TouchableOpacity>
        {replies.length > 0 && (
          <TouchableOpacity onPress={toggleShowReplies}>
            <Text style={styles.showReplies}>{showReplies ? 'Hide Replies' : 'Show Replies'}</Text>
          </TouchableOpacity>
        )}
        {showReplies && (
          <View style={styles.repliesContainer}>
            {replies.map((reply, index) => (
              <View key={index} style={styles.reply}>
                <SmallText size={3.4} color={AppColors.grey} textStyles={CommonStyles.marginBottom_1}>{reply.replierName}</SmallText>
                <SmallText>{reply.replyText}</SmallText>
              </View>
            ))}
          </View>
        )}
        {showReplyBox && (
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write a reply..."
              value={replyText}
              onChangeText={setReplyText}
              placeholderTextColor={AppColors.black}
            />
            <TouchableOpacity
              onPress={handleSendReply}
              style={[
                styles.sendReplyButton,
                replyText.trim() === '' ? { backgroundColor: AppColors.grey } : {},
              ]}
              disabled={loading || replyText.trim() === ''}
            >
              {loading ? (
                <ActivityIndicator size="small" color={AppColors.white} />
              ) : (
                <Text style={styles.sendReplyButtonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewDetailCard;