
export type RootStackParamList = {
    Splash: undefined;
    SelectType: undefined,
    SharedScreens: undefined,
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    ChooseUserType: undefined;
    EmailVerification: undefined;
    ResetPassword: undefined;
    PhoneNumber: undefined;
    HomeBase: undefined;
    Notification: undefined;
    Search: undefined;
    TopDestinationDetails: undefined;
    OfferDetails:  {
      offer: any;
      ownerImage: string;
      images: string;
      type: string;
  };
    Reviews: {
      userId: string;
      userType: string;
      type: string;
  };
    FullFeatureList: undefined;
    SendOffer: undefined;
    TripDetails: {
        trip: any;
        ownerImage: string;
        userType: string;
    };
    LeaveRating:{
      ownerId: string,
      userType: string,
      userId:string,
      bookingId: string
    };
    Transaction: undefined;
    TransactionDetails:undefined;
    Setting: undefined;
    EditProfilePicture: undefined;
    OwnerProfile: undefined;
    Booking: undefined;
    Location:undefined;
    CustomOffers: undefined;
    OwnerOfferDetails: undefined;
    OwnerHome: undefined;
    OwnerOfferScreen: undefined;
    OwnerTripScreen: undefined;
    OwnerProfileScreen: undefined;
    AddOffer: undefined;
    AddFeatures: undefined;
    ImageSelection: undefined;
    AddRules: undefined;
    EditOffer: undefined;
    FeatureList: undefined;
    OwnerTripDetails: {
        trip: any;
        ownerImage: string;
        userType: string;
        _id: string;
        rating: number;
      };
    RenterProfile: undefined;
    GetHelp: {
      userdata : any
    };
    OwnersLocationScreen: undefined;
    OwnerListingScreen: undefined;
    SelectList: undefined;
    EditOwnerProfilePicture: undefined;
    EditOwnerCoverPicture: undefined;
    SendListing: undefined;
    SubmittedBoats: undefined;
    TermsConditions: undefined;
    PrivacyPolicy: undefined;
    FAQ: undefined;
    OwnerFAQ: undefined ;
    AccountSetting: undefined ;
    UserLocation: undefined ;
    LocationPermission: undefined ;
    Saved: undefined ;
    LinkOfferDetails: undefined ;
    Filter: undefined ;
  };
  