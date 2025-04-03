import { FlatList, View } from 'react-native';
import { Button, CurrencyInput, HourSelector, LargeText } from '../../components';
import CommonStyles from '../../utills/CommonStyles';
import styles from './styles';

interface Package {
  id: number;
  price: string;
  hours: string;
}

interface PackageSelectionProps {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  onPriceChange: (id: number, price: string) => void;
  onHoursChange: (id: number, hours: string) => void;
  hoursOptions: string[];
}

const PackageSelection = ({
  packages,
  setPackages,
  onPriceChange,
  onHoursChange,
  hoursOptions
}: PackageSelectionProps) => {

  const handleAddPackage = () => {
    if (packages.length < 5) {
      const newId = packages.length > 0 ? packages[packages.length - 1].id + 1 : 1;
      setPackages([...packages, { id: newId, price: '$0.00', hours: '' }]);
    }
  };

  const handleRemovePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const renderPackage = ({ item }: { item: Package }) => (
    <View key={item.id} style={styles.packageContainer}>
      <View style={styles.priceView}>
        <LargeText size={3}>Price</LargeText>
        <CurrencyInput
          value={item.price}
          onValueChange={(value) => onPriceChange(item.id, value)}
          placeholder="Enter price"
          inputStyle={CommonStyles.marginLeft_2}
        />
      </View>
      <View style={styles.hoursView}>
        <HourSelector
          hours={hoursOptions}
          onSelect={(hours) => onHoursChange(item.id, hours)}
          selectedHours={item.hours}
        />
      </View>
      <Button
        text="Remove Package"
        onPress={() => handleRemovePackage(item.id)}
        disabled={packages.length === 1}
        buttonStyle={packages.length === 1 ? styles.disableRemoveButton : styles.removeButton}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={packages}
        renderItem={renderPackage}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
      <Button
        text="Add Package"
        onPress={handleAddPackage}
        disabled={packages.length >= 5}
        buttonStyle={packages.length >= 5 ? styles.disableAddButton : styles.addButton}
      />
    </View>
  );
};

export default PackageSelection;
