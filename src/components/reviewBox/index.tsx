import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import { LargeText, SmallText } from "../text";
import styles from "./styles";

type textProps = {
    reviewerName: string,
    reviewerImage: string,
    reviewDate: string,
    reviewText: string,
    rating: number,
}

const ReviewBox = ({
    reviewerImage,
    reviewDate,
    reviewerName,
    reviewText,
    rating,
}: textProps) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? true : false;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

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
        <View style={styles.container}>
            <View style={styles.userInfoView}>
                <Image source={{ uri: reviewerImage }} style={styles.UserImage} />
                <View style={styles.infoView}>
                    <LargeText size={4} numberOfLines={1}>{reviewerName}</LargeText>
                    <SmallText size={3} color={AppColors.grey}>{reviewDate}</SmallText>
                </View>
            </View>
            <View style={styles.Ratingcontainer}>
                <View style={styles.starsContainer}>{renderStars()}</View>
            </View>
            <SmallText numberOfLines={6}>{reviewText}</SmallText> 

        </View>
    )
}

export default ReviewBox;