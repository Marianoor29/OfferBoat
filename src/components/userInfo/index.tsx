import { Image, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import { LargeText } from "../text";
import styles from "./styles";
import { useState } from "react";

type UserInfoProps = {
  onPress?: () => void;
  name?: string | number;
  rating: number
  image?: string
  infoContainer?: object
  nameStyle?: object
  userImageStyle?: object
  handleHideAndReport?: (userId: string, listingId: string) => void;
  handleHide?: (userId: string, blockUserId: string) => void;
  dropDown?: boolean,
  userId?: string;
  listingId?: string; 
  blockUserId?: string; 
}

const UserInfo = ({
  onPress = () => null,
  handleHideAndReport,
  handleHide,
  name,
  rating,
  image,
  infoContainer = {},
  userImageStyle,
  dropDown=false,
  userId = "",
  listingId="",
  blockUserId= ""
}: UserInfoProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? true : false;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleReportAndHide = () => {
    if (handleHideAndReport){
    handleHideAndReport(userId, listingId); }
    setIsDropdownVisible(false); 
  };

  const handleBlock = () => {
    if(handleHide){
    handleHide(userId, blockUserId);}
    setIsDropdownVisible(false); 
  };

  const renderStars = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={width(4)} color={AppColors.starColor} />);
    }
    if (halfStar) {
      stars.push(<Icon key="half" name="star" size={width(4)} color={AppColors.starColor} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={width(4)} color={AppColors.starColor} />);
    }
    return stars;
  };
  return (
    <View style={[styles.container, infoContainer, { width: dropDown ? width(90) : width(40) }]}>
      <View style={styles.infoView}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} >
        <Image source={{ uri: image }} style={[styles.image, userImageStyle]} />
      </TouchableOpacity>
      <View>
        <LargeText size={4}>{name}</LargeText>
        <View style={styles.Ratingcontainer}>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>
      </View>
      </View>
      {dropDown && (
        <View >
          <Pressable onPress={toggleDropdown} style={styles.dotsStyle}>
            <MaterialCommunityIcons name="dots-vertical" size={width(5)} color={AppColors.black} />
          </Pressable>
          <Modal
            visible={isDropdownVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsDropdownVisible(false)}
          >
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsDropdownVisible(false)}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={handleReportAndHide} style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Report & Hide Listing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBlock} style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Block User</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    </View>
  )
}


export default UserInfo;