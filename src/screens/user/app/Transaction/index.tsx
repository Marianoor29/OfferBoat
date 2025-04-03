import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import {
  AppLoader,
  LargeText,
  ScreenWrapper,
  SimpleHeader,
  SmallText,
  TransactionRow
} from '../../../../components';
import apiUrl from '../../../../config';
import AppColors from '../../../../utills/AppColors';
import styles from './styles';

const Transaction = ({ navigation, route }: any) => {
  const userId = route.params.userId;
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(20);
  const baseURL = apiUrl
  const flatListRef = useRef<FlatList<any> | null>(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/payment/transactions`, {
        params: { userId }
      });

      const fetchedTransactions = Array.isArray(response.data) ? response.data : [];
      setTransactions(fetchedTransactions);
    } catch (error: any) {
      console.log('Failed to fetch transactions:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [userId])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the FlatList when page changes
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  // Slice transactions array to get current page data
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const renderItem = ({ item }: any) => {
    const formattedAmount = (item.amount / 100).toFixed(2); // Convert amount to the desired format
    return (
      <TransactionRow
        date={new Date(item.created * 1000).toLocaleDateString()} // Stripe uses timestamps in seconds
        time={new Date(item.created * 1000).toLocaleTimeString()}
        price={formattedAmount}
        transactionStatus={
          item.status === 'succeeded' ? 'Success' : item.status === 'requires_capture' ? 'Hold' :
          item.status === 'canceled' ? 'Cancelled' : 'Failed'
        }
        onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
      />
    );
  };

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4}>Transactions</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
        <AppLoader isLoader={loading} />
        {!loading && transactions.length === 0 ? (
          <View style={styles.emptyView}>
            <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
            <LargeText size={4}>You have no transaction history yet!</LargeText>
          </View>
        ) : (
          <>
            <FlatList
              ref={flatListRef} // Attach the ref here
              data={currentTransactions}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
              showsVerticalScrollIndicator={true}
              scrollEnabled={false}
            />
            <View style={styles.pageControlContainer}>
              {pageButtons.map((page) => (
                <Pressable
                  key={page}
                  style={[styles.pageButton, currentPage === page && styles.activePageButton]}
                  onPress={() => handlePageChange(page)}
                >
                  <SmallText>{page}</SmallText>
                </Pressable>
              ))}
            </View>
          </>
        )}
        <View style={styles.bottomView}>
          <SmallText color={AppColors.grey} textAlign={'justify'} size={3.4}>
            OfferBoat only collects a non-refundable booking fee; the cost of the boat renter plus any additional charges must be collected from the renter by the boat owner.
          </SmallText>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Transaction;
