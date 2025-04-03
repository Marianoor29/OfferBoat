import * as yup from 'yup';

const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const phonePattern = /\b\d{10,}\b|(?:\(\d{3}\)|\d{3}-|\d{3}\s)\d{3}-\d{4}/;
const atSignPattern = /@/;
const phonePatternWithSpaces = /(\b\d{3} \d{3} \d{4}\b)/;
const phonePatternWithSpaces1 = /(\b\d{3} \d{4} \d{4}\b)/;
const restrictedWordsPattern = /\b(gmail|email|icloud|com|yahoo|mail|dot)\b/i; // case-insensitive match for "gmail", "email", or "icloud"
const moreThanFourNumbersPattern = /\d{5,}/; // Matches five or more consecutive digits
const disallowPhoneWithIrregularSpaces = /\b(?:\d\s*){10,}\b/; 

export const VerificationCodeSchema = yup.object().shape({
  code: yup.string()
    .length(6, 'Verification code must be exactly 6 digits')
    .required('Verification code is required'),
});

export const userSchema = yup.object().shape({
  firstName: yup.string().
  required("FirstName is required"),
  lastName: yup.string().
  required("LastName is required"),
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid.'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
  ConfirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Password must match'),
});
export const accountSchema = yup.object().shape({
  firstName: yup.string().
  required("FirstName is required"),
  lastName: yup.string().
  required("LastName is required"),
});
export const passwordSchema = yup.object().shape({
  currentPassword: yup
  .string()
  .required('Current Password is required')
  .min(6, 'Password should be atleast 6 characters long'),
  newPassword: yup
  .string()
  .required('New Password is required')
  .min(6, 'Password should be atleast 6 characters long'),
});


export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid.'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
});
export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid.'),
});

export const ResetPasswordSchema = yup.object().shape({
  token: yup
    .string()
    .required('Code is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters long'),
});

export const userOfferSchema = yup.object().shape({
  price: yup.number().
  required("Price is required"),
  member: yup.number().
  required("Members is required"),
  duration: yup.number().
  required("Duration is required"),
  description: yup
    .string()
});

export const addOfferSchema = yup.object().shape({
  title: yup.string()
  .required("Title is required")
  .test('no-email-or-phone', 'Title cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
    if (!value) return true;
    // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
    return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
 }),
  description: yup.string()
    .required("Description is required")
    .test('no-email-or-phone', 'Description cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
      if (!value) return true;
      // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
      return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
   }),
});

export const sendListingMessageSchema = yup.object().shape({
  message: yup.string()
    .required("Please write a message")
    .test('no-email-or-phone', 'Message cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
      if (!value) return true;
      // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
      return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
    }),
});
export const tripInstructionsSchema = yup.object().shape({
  tripInstructions: yup.string().optional()
    .test('no-email-or-phone', 'Instructions cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
      if (!value) return true;
      // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
      return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
    }),
});
export const featureSchema = yup.object().shape({
  feature: yup.string()
    .required("Please enter a feature")
    .test('no-email-or-phone', 'Feature cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
      if (!value) return true;
      // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
      return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
    }),
});
export const ruleSchema = yup.object().shape({
  rule: yup.string()
    .required("Please write a rule")
    .test('no-email-or-phone', 'Rules cannot contain email addresses, "@", phone numbers, or restricted words like "gmail", "email", "icloud" or ".com', value => {
      if (!value) return true;
      // Check if the message contains an "@" sign, a phone number with spaces, or restricted words
      return !phonePattern.test(value) && !emailPattern.test(value) && !atSignPattern.test(value) && !phonePatternWithSpaces.test(value) && !restrictedWordsPattern.test(value) && !phonePatternWithSpaces1.test(value) && !moreThanFourNumbersPattern.test(value) &&
             !disallowPhoneWithIrregularSpaces.test(value);
    }),
});


