import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  AppLoader,
  LargeText,
  OfferCard,
  ScreenWrapper,
  SimpleHeader
} from '../../../../components';
import apiUrl from '../../../../config';
import ScreenNames from '../../../../navigation/routes';
import { RootState } from '../../../../redux/store';
import { useAppSelector } from '../../../../redux/store/hook';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import styles from './styles';
import { height, width } from '../../../../utills/Dimension';
import Icon from 'react-native-vector-icons/Feather';
import AppColors from '../../../../utills/AppColors';

const TopDestinationDetails = ({ navigation, route }: any) => {
  const { TopDestination } = route.params;
  const type = route.params.type;
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [ownerListing, setOwnerListing] = useState([]);
  const [totalListings, setTotalListings] = useState(0);
  const [offset, setOffset] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const userData = useAppSelector((state: RootState) => state.user);

  const fetchOffers = async (offsetValue: number = 0) => {
    setLoadingMore(true);
    setButtonLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/listing/listingsWithLocation`,{
        params: {
          location: TopDestination.title,
          limit: 20,
          offset: offsetValue,
          userId: userData._id,
        },
      });
        const sortedOffers = response.data.listings.sort((a: any, b: any) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        setTotalListings(response.data.totalCount)
        // Update offers and offset
        setOffers((prevOffers) => [...prevOffers, ...sortedOffers]);
        setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      setErrorMessage(`No boats found in ${TopDestination.title} or nearby locations!`);
    } finally {
      setLoadingMore(false);
      setButtonLoading(false);
      setLoading(false)
    }
  };

  const handlePress = useCallback((item: any) => {
    const imagesWithBaseURL = item.images.map((image: string) => `${image}`);
    const ownerProfileImage = item.ownerId?.profilePicture;
    navigation.navigate(ScreenNames.OFFERDETAILS, {
      offer: item,
      images: imagesWithBaseURL,
      ownerImage: ownerProfileImage,
      type: "Listing",
    });
  }, [navigation]);

  const renderOfferItem = (type: any, item: any) => {
    const ownerProfileImage = item?.ownerId?.profilePicture;
    return (
      <OfferCard
        images={item?.images}
        boatOwnerImage={ownerProfileImage}
        title={item?.title}
        description={item?.description}
        location={item?.location}
        members={item?.numberOfPassengers}
        onPress={() => handlePress(item)}
        onPressImage={() => handlePress(item)}
        maxImages={3}
      />
    );
  };

  const fetchOwnerListings = async () => {
    setLoading(true);
    try {
      // Make a GET request with the userId as a query parameter
      const response = await axios.get(`${apiUrl}/listing/ownerListingsById`, {
        params: { userId: TopDestination }
      });
      setOwnerListing(response.data.listings);
    } catch (error) {
      setErrorMessage('This Owner Don\'t Have Any Listings Yet!');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreOffers = () => {
    if (!loadingMore && offers.length < totalListings) {
      fetchOffers(offset);
    }
  };

  useEffect(() => {
    if (type === "TopDestination") {
      fetchOffers();
    }
    else {
      fetchOwnerListings();
    }
  }, [type]);

  const layoutProvider = new LayoutProvider(
    () => 'DEFAULT',
    (type, dim) => {
      dim.width = width(100);
      dim.height = Platform.OS === 'android' ? height(35) : height(32);
    }
  );

  const dataProvider = new DataProvider((r1, r2) => r1._id !== r2._id)
    .cloneWithRows(type === "TopDestination" ? offers : ownerListing);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.navigate(ScreenNames.HOME)}
          emptyView={
            <LargeText size={4} textAlign={'center'}>
              {type === "OwnerListing" ? `Owner's Active Listings` : `Boats in ${TopDestination.title} or near areas`}
            </LargeText>
          }
        />
      )}
    >
      <View style={styles.container}>
        {loading && offers.length === 0 ? (
          <AppLoader isLoader={loading} />
        ) : (
          <>
            {!loading && offers.length === 0 && type !== "OwnerListing" ? (
              <View style={styles.emptyView}>
                <LottieView source={require('../../../../assets/gif/Sorry.json')} style={styles.animatedImageStyle} autoPlay loop={true} />
                <LargeText size={4}>{errorMessage ? errorMessage : `No boats found in ${TopDestination.title} or nearby locations!`}</LargeText>
              </View>
            ) : (
              type === "TopDestination" ? (
                <RecyclerListView
                  style={{ flex: 1, width: '96%', height: '100%' }}
                  dataProvider={dataProvider}
                  layoutProvider={layoutProvider}
                  rowRenderer={renderOfferItem}
                  onEndReached={loadMoreOffers}
                  onEndReachedThreshold={0.5}
                  renderFooter={() => (
                    <View style={{ padding: 10 }}>
                      {buttonLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : offers.length < totalListings ? (
                        <TouchableOpacity onPress={loadMoreOffers}>
                          <LargeText size={3} textAlign={'center'}>Load More</LargeText>
                        </TouchableOpacity>
                      ) : (
                        <LargeText size={3} textAlign={'center'}>No More Offers</LargeText>
                      )}
                    </View>
                  )}
                />
              ) : (
                <FlatList
                  data={ownerListing}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item }) => renderOfferItem(null, item)}
                  ListFooterComponent={() => (
                    <View style={{ padding: 10 }}>
                      {buttonLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <LargeText size={3} textAlign={'center'}>No More Listings</LargeText>
                      )}
                    </View>
                  )}
                />
              )
            )}
          </>
        )}
        
      </View>
    </ScreenWrapper>
  );
};

export default TopDestinationDetails;
