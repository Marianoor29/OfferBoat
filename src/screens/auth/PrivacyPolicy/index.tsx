import { Text, View } from 'react-native';
import {
  LargeText,
  ScreenWrapper,
  SimpleHeader,
  SmallText
} from '../../../components';
import AppColors from '../../../utills/AppColors';
import CommonStyles from '../../../utills/CommonStyles';
import styles from './styles';

const PrivacyPolicy = ({ navigation, route }: any) => {

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
        />
      )}
    >
      <View style={styles.container}>
        <LargeText textAlign={'center'}>Privacy Policy</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3} color={AppColors.grey} textAlign={'center'}>Effective Date: 10/11/2024</SmallText>

        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
          <Text style={{ fontWeight: 'bold' }}>  Your privacy matters to us. Please read our policy carefully.</Text>
             
        {`\n`}   {`\n`}
          Welcome to Offerboat! We’re super excited to have you here. Your privacy means a lot to us, and we want to be completely transparent about how we handle your information. This Privacy Policy is your go-to guide for understanding what data we collect, how we use it, and what rights you have. So, grab a drink, get comfy, and let’s dive in!
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>1. Information We Collect</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        When you’re using our Services, we might collect a few things:     
        {`\n`}   {`\n`}
        <Text style={{ fontWeight: 'bold' }}>Personal Info:</Text>This is the stuff you give us directly—your name, email, address, and phone number when you sign up or get in touch with us.
        {`\n`} 
        <Text style={{ fontWeight: 'bold' }}>Techy Data:</Text>Our servers might collect some info automatically, like your IP address, browser type, and how you interact with our Services. This helps us understand how everything is working!
        {`\n`} 
        <Text style={{ fontWeight: 'bold' }}>Payment Details: </Text>If you’re making a purchase, we’ll need your payment info—like your credit card number and expiration date. Don’t worry; we keep this info safe!
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>2. How We Use Your Information </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        We’re all about making your experience with Offerboat as smooth as possible. Here’s how we might use your info:{`\n`}{`\n`}
        <Text style={{ fontWeight: 'bold' }}>● </Text>To process your orders and keep you updated with confirmations and invoices.{`\n`}
        <Text style={{ fontWeight: 'bold' }}>● </Text>To respond to your questions and provide customer support.{`\n`}
        <Text style={{ fontWeight: 'bold' }}>● </Text>To send you cool updates and promotions we think you’ll love.{`\n`}
        <Text style={{ fontWeight: 'bold' }}>● </Text>To keep improving our Services based on how you use them.
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>3. Sharing Your Information </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        We know sharing info can feel a bit scary, but we promise we only do it when necessary:{`\n`}{`\n`}
        <Text style={{ fontWeight: 'bold' }}>Legal Stuff: </Text>If we ever have to comply with the law or protect our rights, we may need to share your info{`\n`}
        <Text style={{ fontWeight: 'bold' }}>Third-Party Helpers: </Text>We work with some awesome third-party services to help us out, like payment processors and customer support teams. They only get access to what they need to do their jobs.{`\n`}
        <Text style={{ fontWeight: 'bold' }}>Business Moves: </Text>If we ever merge with or sell to another company, your info might go along for the ride.{`\n`}
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>4. Cookies and Tracking </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        We use cookies (not the yummy kind) and similar tech to enhance your experience on our Services. These help us remember you and your preferences, making everything easier.       
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>5. Links to Other Sites </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        Our Services may include links to other cool websites and apps. Just a heads up: once you leave Offerboat, we’re not responsible for how those sites handle your information. Always read their privacy policies!       
         </SmallText>

        <LargeText size={3.4} textAlign={'left'}>6. Keeping Your Info Safe </LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        We take security seriously! We use all the right measures to protect your info, but no method is foolproof. While we do our best to keep your data safe, remember that nothing on the internet is 100% secure.         
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>7. For the Youngsters</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        We’re not here to collect info from kids under 13. If we find out we’ve collected something from a child without permission, we’ll delete it ASAP
        </SmallText>

        <LargeText size={3.4} textAlign={'left'}>8. Your Choices</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        You have the power! You can update your information anytime by logging into your account or contacting us directly. If you ever want to delete your account, just let us know, and we’ll take care of it.       
       </SmallText>

        <LargeText size={3.4} textAlign={'left'}>9. Let’s Connect!</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        Have questions? Suggestions? Just want to say hi? We’re all ears! Reach out to us anytime:       
        </SmallText>
        <LargeText size={3.4} textAlign={'left'}>Offerboat</LargeText>
        <SmallText textStyles={CommonStyles.marginBottom_2} size={3.4} textAlign={'justify'}>
        Email: support@offerboat.com  {`\n`}
        Address: 1951 NW S River Drive Miami FL. 33125
        </SmallText>


      </View>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;
