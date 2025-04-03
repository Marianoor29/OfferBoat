import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import AppColors from '../../utills/AppColors';
import PhotosSlider from '../photosSlider';
import { LargeText, SmallText } from '../text';
import styles from './styles';

type textProps = {
  title?: string,
  source?: string,
  boatOwnerImage?: string,
  ButtonColor?: string,
  buttonTitle?: string,
  members?: number,
  location?: string,
  onPress?: () => void,
  onPressImage?: () => void,
  description?: string,
  images: string[],
  blockedListings?: any,
  OffersCoverImage?: any,
  blockedView?: boolean,
  maxImages?: number 
}

const OfferCard = React.memo(({
  boatOwnerImage,
  title,
  members,
  location,
  description,
  buttonTitle='View Deal',
  images,
  onPress = () => null,
  onPressImage = () => null,
  ButtonColor = AppColors.secondaryRenter,
  maxImages,
  blockedView=false,

}: textProps) => {
  return (
    <View style={styles.container}>
      <PhotosSlider
        images={images}
        onPressImage={onPressImage}
        maxImages={maxImages}
      />
    {blockedView && (
        <View style={styles.blockTextStyle}>
      <LargeText size={3} color={AppColors.red} numberOfLines={1}
      >Blocked</LargeText>
      </View>
      )}
      <Pressable style={styles.membersbtnStyle}>
        <SmallText textStyles={styles.membersbtnTextStyle}>{members} Passengers</SmallText>
      </Pressable>
      <Pressable style={styles.membersbtnStyle}>
        <SmallText textStyles={styles.membersbtnTextStyle}>{members} Passengers</SmallText>
      </Pressable>
      <View style={styles.innerView}>
        <Image source={{ uri: boatOwnerImage || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} style={styles.boatOwnerImage} />
        <View>
          <LargeText textStyles={styles.titleStyle} numberOfLines={1}>{title}</LargeText>
          <SmallText textStyles={styles.descriptionStyle} numberOfLines={1}>{description}</SmallText>
          <View style={styles.bottomView}>
            <Text style={styles.price} numberOfLines={1}>{location}</Text>
          </View>
        </View>
        <View>
          <Pressable style={[styles.checkDetailsBtn, {backgroundColor :ButtonColor}]} onPress={onPress}>
            <SmallText textStyles={styles.checkDetailsBtnText}>{buttonTitle}</SmallText>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

export default React.memo(OfferCard);

