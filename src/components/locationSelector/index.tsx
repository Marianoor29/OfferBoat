import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../../utills/AppColors';
import { height, width } from '../../utills/Dimension';
import styles from './styles';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDiY4TiK....8nYjMpxxQ3Gxig'; 

type LocationSelectorProps = {
    placeholder?: string,
    fetchDetails?: boolean,
    suppressDefaultStyles?: boolean,
    onPress?: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void,
    locationContainer?: object,
    containerWidth?: any,
    listcontainerWidth?: any,
    separatorColor?: any
    textInputBackgroundColor?: string
    rowStyle?: object
    isFullAddress?: boolean 
    isRowScrollable?: boolean 
    value?: string
    onChangeText?: any
    containerHeight?: any
}

const LocationSelector = forwardRef<GooglePlacesAutocompleteRef, LocationSelectorProps>(({
    placeholder = 'Search Location',
    fetchDetails = true,
    suppressDefaultStyles = true,
    onPress = () => null,
    locationContainer = {},
    containerWidth = width(90),
    listcontainerWidth = width(90),
    textInputBackgroundColor = AppColors.inputWhite,
    rowStyle = {},
    separatorColor = AppColors.white,
    isFullAddress = false, 
    isRowScrollable = true,
    containerHeight = height(6)
}, ref) => {
 const textInputProps = {
    placeholderTextColor: AppColors.black,
    fontSize: width(3.6),
    fontWeight: '500',
};
    return (
        <View style={[styles.container, locationContainer]}>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                fetchDetails={fetchDetails}
                suppressDefaultStyles={suppressDefaultStyles}
                listViewDisplayed='auto'
                isRowScrollable={isRowScrollable}
                enablePoweredByContainer={false}
                renderRow={(data) => (
                    <View style={[styles.rowStyle, rowStyle]}>
                        <Icon name='location-pin' size={width(5)} color={AppColors.black} />
                        <Text style={styles.rowText}>{data?.description}</Text>
                    </View>
                )}
                styles={{
                    textInputContainer: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: containerWidth,
                    },
                    textInput: {
                        paddingHorizontal: 10,
                        fontSize: width(3.6),
                        color: AppColors.black,
                        backgroundColor: textInputBackgroundColor,
                        width: containerWidth,
                        height: containerHeight,
                        borderRadius:10
                    },
                    description: {
                        color: AppColors.black,
                    },
                    listView: {
                        color: AppColors.black,
                        zIndex: 1000,
                        width: listcontainerWidth,
                        backgroundColor: AppColors.white,
                    },
                    separator: {
                        height: width(0.3),
                        backgroundColor: separatorColor,
                    },
                    loader: {
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        height: 20,
                    },
                    row: {
                        backgroundColor: AppColors.white,
                        padding: 13,
                        height: 44,
                    },
                }}
                textInputProps={textInputProps} 
                onPress={(data, details) => onPress(data, details)}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: "en",
                    types: isFullAddress ? 'geocode' : '(cities)', 
                }}
                ref={ref}
            />
        </View>
    );
});

export default LocationSelector;
