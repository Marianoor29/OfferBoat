import { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  BoatCategoryDropdown,
  Button,
  HourSelector,
  LargeText,
  RangeSelector,
  ScreenWrapper,
  SimpleHeader,
} from '../../../../components';
import { clearFilters, setFilters } from '../../../../redux/slice/filterSlice/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store/hook'; 
import AppColors from '../../../../utills/AppColors';
import { height, width } from '../../../../utills/Dimension';
import { BoatCategories, BoatLength, BoatManufacturer } from '../../../../utills/enum';
import styles from './styles';

const Filter = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.filter); 
  const hoursOptions = ['2', '3', '4', '6', '8'];
  const [hours, setHours] = useState(filterState.hours || '');
  const [selectedRange, setSelectedRange] = useState<[number, number]>(filterState.priceRange || [1, 25000]);
  const [numberOfPassengers, setNumberOfPassenger] = useState<number>(filterState.numberOfPassengers || 0);
  const [boatCategory, setBoatCategory] = useState<string | undefined>(filterState.boatCategory);
  const [boatManufacturer, setBoatManufacturer] = useState<string | undefined>(filterState.boatManufacturer);
  const [lengthRange, setLengthRange] = useState<string | undefined>(filterState.lengthRange);

  // Populate state with Redux values on mount
  useEffect(() => {
    setHours(filterState.hours);
    setSelectedRange(filterState.priceRange);
    setNumberOfPassenger(filterState.numberOfPassengers);
    setBoatCategory(filterState.boatCategory);
    setBoatManufacturer(filterState.boatManufacturer);
    setLengthRange(filterState.lengthRange);
  }, [filterState]);

  const decreaseMembers = () => {
    if (numberOfPassengers > 0) {
      setNumberOfPassenger(numberOfPassengers - 1);
    }
  };

  const handleCategorySelect = (value: string) => {
    setBoatCategory(value);
  };

  const handleManufacturerSelect = (value: string) => {
    setBoatManufacturer(value);
  };

  const handleLengthRange = (value: string) => {
    setLengthRange(value);
  };

  const handleRangeChange = (min: number, max: number) => {
    setSelectedRange([min, max]);
  };

  const applyFilters = () => {
    const filters = {
      hours,
      priceRange: selectedRange,
      numberOfPassengers,
      boatCategory,
      boatManufacturer,
      lengthRange,
    };
    dispatch(setFilters(filters));
    navigation.goBack()
  };

  const handleClearAll = () => {
    dispatch(clearFilters());
    setNumberOfPassenger(0);
    setBoatCategory(undefined);
    setBoatManufacturer(undefined);
    setLengthRange(undefined);
    setHours('');
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>Filter</LargeText>}
          RightIcon={<LargeText size={3}>Clear All</LargeText>}
          onPressRightIcon={handleClearAll}
          rightIconView={{
            width: width(15),
            height: height(4),
          }}
        />
      )}
    >
      <View style={styles.container}>
        <LargeText size={4} textStyles={styles.heading}>Hours</LargeText>
        <HourSelector
          hours={hoursOptions}
          onSelect={(hours) => setHours(hours)}
          selectedHours={hours}
        />
        <View style={styles.line}></View>
        <LargeText size={4} textStyles={styles.heading}>Price</LargeText>
        <RangeSelector
          minPrice={1}
          maxPrice={25000}
          initialRange={[1, 5000]}
          step={1}
          onRangeChange={handleRangeChange}
        />
        <View style={styles.line}></View>
        <LargeText size={4} textStyles={styles.heading}>Passengers</LargeText>
        <View style={styles.membersView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={decreaseMembers}>
            <AntDesign name="minus" size={width(5)} color={AppColors.black} />
          </TouchableOpacity>
          <LargeText size={4}>{numberOfPassengers}</LargeText>
          <TouchableOpacity activeOpacity={0.7} style={styles.addView} onPress={() => setNumberOfPassenger(numberOfPassengers + 1)}>
            <AntDesign name="plus" size={width(5)} color={AppColors.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <BoatCategoryDropdown
          categories={BoatLength}
          onSelect={handleLengthRange}
          title="Select a Boat Length"
          selectedValue={lengthRange}
        />
        <BoatCategoryDropdown
          categories={BoatCategories}
          onSelect={handleCategorySelect}
          title="Select a Boat Category"
          selectedValue={boatCategory}
        />
        <BoatCategoryDropdown
          categories={BoatManufacturer}
          onSelect={handleManufacturerSelect}
          title="Select a Boat Manufacturer"
          selectedValue={boatManufacturer}
        />
        <Button
          text='Apply'
          buttonStyle={styles.btn}
          onPress={applyFilters}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Filter;
