import { Image, Pressable, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';
import { SmallText } from '../text';
import styles from './styles';

type profileInfoProps = {
  coverImage?: string,
  userImage?: string,
  container?: any,
  firstName?: string,
  lastName?: string,
  rating: number;
  phoneNumber?: string | number;
  email?: string,
  address?: string,
  onPress?: () => void,
  onPressProfilePicture?: () => void,
};
const profileInfo = ({
  userImage,
  container,
  firstName,
  lastName,
  rating = 0,
  email,
  address,
  coverImage,
  phoneNumber,
  onPress,
  onPressProfilePicture,
}: profileInfoProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? true : false;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  const renderStars = () => {
    const stars: JSX.Element[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={width(5)} color={AppColors.starColor} />);
    }
    if (halfStar) {
      stars.push(<Icon key="half" name="star" size={width(5)} color={AppColors.starColor} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-o" size={width(5)} color={AppColors.starColor} />);
    }
    return stars;
  };

  return (
    <View style={[styles.container, container]}>
      {coverImage ? (
        <View style={styles.OwnerContainer}>
          <Image
            source={{
              uri: coverImage
            }}
            style={styles.coverImageStyle}
          />
          {onPress && (
            <Pressable onPress={onPress} style={styles.ownerSideEditCamera}>
              <Entypo name="camera" size={width(5)} color={AppColors.black} />
            </Pressable>
          )}
          <View style={styles.ptofilePictureView}>
            <Image source={{ uri: userImage }} style={styles.ownerProfileImageStyle} />
            {onPressProfilePicture && (
              <Pressable onPress={onPressProfilePicture} style={styles.ownerSideEditUserImage}>
                <Entypo name="camera" size={width(5)} color={AppColors.black} />
              </Pressable>
            )}
          </View>
        </View>

      ) : (
        <View>
          <Image source={{ uri: userImage }} style={styles.profileImageStyle} />
          {onPress && (
            <Pressable onPress={onPress} style={styles.editUserImage}>
              <Entypo name="camera" size={width(5)} color={AppColors.black} />
            </Pressable>
          )}

        </View>
      )}
      <View style={styles.infoView}>
        <View style={styles.UserNameView}>
          <Text style={styles.nameStyle} numberOfLines={1}>
            {firstName} {lastName}
          </Text>
          {email && (
          <Text style={styles.emailStyle} numberOfLines={1}>{email}</Text>
          )}
          {phoneNumber && (
            <Text style={styles.emailStyle} numberOfLines={1}>+{phoneNumber}</Text>
          )}
          {address && (
          <Text style={styles.emailStyle} numberOfLines={1}>{address}</Text>
          )}
        </View>
        <View>
          <View style={styles.Ratingcontainer}>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <SmallText textStyles={styles.ratingText}>Ratings: {rating}</SmallText>
          </View>

        </View>
      </View>
      <View>

      </View>
    </View>
  );
};

export default profileInfo;
