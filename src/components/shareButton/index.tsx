import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors';
import { width } from '../../utills/Dimension';

interface ShareButtonProps {
  offerId: string; 
  onShareSuccess?: () => void;
  onShareError?: (error: Error) => void;
}

const ShareButton = ({
  offerId,
  onShareSuccess,
  onShareError,
}: ShareButtonProps) => {
 
  const handleShare = async () => {
    const webUrl = `https://www.offerboat.com/app/${offerId}`;
    const shareOptions = {
      title: 'Check out this boat!',
      message: `Check out this amazing boat on OfferBoat`,
      url: webUrl, 
    };
  
    try {
      const shareResponse = await Share.open(shareOptions);
      console.log('Share response:', shareResponse);
      onShareSuccess && onShareSuccess();
    } catch (error) {
      console.log('Error =>', error);
      console.log('Share failed', 'Unable to share content.');
      onShareError && onShareError(error as Error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShare} >
            <Icon name="share-square-o" size={width(4)} color={AppColors.white} />
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:width(8),
    height:width(8),
    borderRadius:20,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:AppColors.blackShadow
  },
});

export default ShareButton;
