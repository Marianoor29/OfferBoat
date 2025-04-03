const OwnerScreenNames = { 
  OWNERHOME: 'OwnerHome',
  OWNEROFFERSCREEN: 'OwnerOfferScreen',
  OWNERTRIPSCREEN: 'OwnerTripScreen',
  OWNERPROFILESCREEN: 'OwnerProfileScreen',
  ADDOFFER: 'AddOffer',
  HOMEBASE: 'HomeBase',
  IMAGESELECTION: 'ImageSelection',
  ADDFEATURES: 'AddFeatures',
  ADDRULES: 'AddRules',
  OWNEROFFERDETAILS: 'OwnerOfferDetails',
  EDITOFFER: 'EditOffer',
  FEATURELIST: 'FeatureList',
  OWNERTRIPDETAILS: 'OwnerTripDetails',
  RENTERPROFILE: 'RenterProfile',
  OWNERLOCATIONSCREEN : 'OwnersLocationScreen',
  OWNERLISTINGSCREEN : 'OwnerListingScreen',
  SELECTLIST : 'SelectList',
  OWNEREDITPROFILEPICTURE : 'EditOwnerProfilePicture',
  OWNEREDITCOVERPICTURE : 'EditOwnerCoverPicture',
  SENDLISTING : 'SendListing',
  SUBMITTEDBOATS : 'SubmittedBoats',
  OWNERFAQ : 'OwnerFAQ',
}as const; 

export type ScreenNamesType = typeof OwnerScreenNames[keyof typeof OwnerScreenNames];

  
export default OwnerScreenNames;

