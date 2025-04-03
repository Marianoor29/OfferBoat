import { View } from 'react-native';
import {
  LargeText,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../../components';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

const TransactionDetails = ({ navigation, route }: any) => {
  const { transaction } = route.params;
  const formattedAmount = (transaction.amount / 100).toFixed(2);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader 
        onPressFirstIcon={() => navigation.goBack()}
        emptyView={<LargeText size={4} >Transaction details</LargeText>}
        />
      )}>
      <View style={styles.container}>
        <View style={styles.priceView}>
        <LargeText color={AppColors.black}>${formattedAmount}</LargeText>
        <LargeText color={transaction.status === 'succeeded' ?  AppColors.green : 
        transaction.status === 'requires_capture' ? AppColors.grey :  AppColors.red } size={3.4}>
          { transaction.status === 'succeeded' ? 'Success' : transaction.status === 'requires_capture' ? 'Hold' :
          transaction.status === 'canceled' ? 'Cancelled' : 'Failed' }</LargeText>
        </View>
        
            <View style={styles.rowStyle}>
            <SmallText size={4} color={AppColors.grey}>Transaction ID : </SmallText>
              <LargeText size={3.4}>{transaction.id}</LargeText>
            </View>
            <View style={styles.rowStyle}>
            <SmallText size={4} color={AppColors.grey}>Time : </SmallText>
              <LargeText size={3.4}>{new Date(transaction.created * 1000).toLocaleTimeString()}</LargeText>
            </View>
            <View style={styles.rowStyle}>
            <SmallText size={4} color={AppColors.grey}>Total Amount : </SmallText>
              <LargeText size={3.4}>${formattedAmount}</LargeText>
            </View>
            <View style={styles.rowStyle}>
            <SmallText size={4} color={AppColors.grey}>Date : </SmallText>
              <LargeText size={3.4}>{new Date(transaction.created * 1000).toLocaleDateString()}</LargeText>
            </View>
            <View style={styles.rowStyle}>
            <SmallText size={4} color={AppColors.grey}>Payment By : </SmallText>
              <LargeText size={3.4}> Card </LargeText>
            </View>
      </View>
    </ScreenWrapper>
  );
};

export default TransactionDetails;
