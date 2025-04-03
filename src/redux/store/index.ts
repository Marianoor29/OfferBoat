import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from '../slice/config/loaderSlice';
import userSlice from '../slice/user/userSlice';
import imagesReducer from '../slice/imagesSlice/imagesSlice';
import featuresReducer from '../slice/featuresSlice/featuresSlice';
import rulesReducer from '../slice/rulesSlice/rulesSlice'
import locationSlice from '../slice/locationSlice/locationSlice'
import authReducer from '../slice/auth/authSlice';
import customOffersReducer from '../slice/offerSlice/customOffersSlice'
import ownerTripsReducer from '../slice/ownerTripSlice/ownerTripsSlice';
import listingsReducer from '../slice/listingsSlice/listingsSlice'
import renterTripsReducer from '../slice/renterTripSlice/renterTripsSlice'
import filterReducer from '../slice/filterSlice/filterSlice'

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
    user: userSlice,
    images: imagesReducer,
    features: featuresReducer,
    rules: rulesReducer,
    location: locationSlice,
    auth: authReducer,
    customOffers: customOffersReducer,
    ownerTrips: ownerTripsReducer,
    renterTrips: renterTripsReducer,
    listings: listingsReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
