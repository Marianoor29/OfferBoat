import { useState } from 'react';
import { FlatList, Pressable, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  LargeText,
  LocationSelector,
  ScreenWrapper,
  SmallText
} from '../../../../components';
import ScreenNames from '../../../../navigation/routes';
import AppColors from '../../../../utills/AppColors';
import CommonStyles from '../../../../utills/CommonStyles';
import { width } from '../../../../utills/Dimension';
import styles from './styles';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: '1', name: 'Miami' },
  { id: '2', name: 'Miami Beach' },
  { id: '3', name: 'Tampa' },
  { id: '4', name: 'Los Angeles' },
  { id: '5', name: 'Seattle' },
  { id: '6', name: 'Washington D.C.' },
  { id: '7', name: 'San Francisco' },
  { id: '8', name: 'Chicago' },
  { id: '9', name: 'New York' },
];

const Search = ({ navigation }: any) => {
  const [location, setLocation] = useState<string>('')
  const handleSelectCategory = (location: string) => {
    setLocation(location);
    navigation.navigate(ScreenNames.TOPDESTINATIONDETAILS, {TopDestination: {title: location}, type: "TopDestination"})
  };
  const onPressLocation = (data: any) => {
    const newLocation = data.description;
    setLocation(newLocation);
    navigation.navigate(ScreenNames.TOPDESTINATIONDETAILS, {TopDestination: {title: newLocation}, type: "TopDestination"});
  };
  
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View style={styles.searchView}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconView}>
            <AntDesign name="arrowleft" size={width(5)} color={AppColors.grey} />
          </Pressable>
          <LocationSelector
            fetchDetails={true}
            onPress={onPressLocation}
            containerWidth={width(80)}
            listcontainerWidth={width(92)}
            textInputBackgroundColor={AppColors.white}
            separatorColor={AppColors.white}
          />
        </View>
      )}>
      <View style={styles.container}>
        <LargeText size={4} textStyles={styles.heading}>Explore Places</LargeText>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.placesItem} onPress={() => handleSelectCategory(item.name)}>
              <Ionicons name='location' size={width(5)} color={AppColors.secondaryRenter} />
              <SmallText size={3.4} textStyles={CommonStyles.marginLeft_2}>{item.name}</SmallText>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Search;
