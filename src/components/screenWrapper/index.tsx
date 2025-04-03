import { useIsFocused } from '@react-navigation/native';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppColors from '../../utills/AppColors';
import styles from './styles';

type wrapperProps = {
  children?: any,
  statusBarColor?: string,
  translucent?: boolean,
  scrollEnabled?: boolean,
  backgroundImage?: any,
  backgroundColor?: string,
  headerUnScrollable?: () => void,
  footerUnScrollable?: () => void,
  barStyle?: StatusBarStyle,
};

const ScreenWrapper = ({
  children,
  statusBarColor = AppColors.white,
  translucent = false, 
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = AppColors.white,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = 'dark-content',
}: wrapperProps) => {
  function FocusAwareStatusBar({ barStyle, backgroundColor, translucent  }: { barStyle: StatusBarStyle, backgroundColor: string, translucent : boolean }) {
    const isFocused = useIsFocused();
    return isFocused ? (
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={translucent} 
      />
    ) : null;
  }

  const content = () => {
    return (
      <View style={[styles.container, { backgroundColor: backgroundColor }]}>
        <FocusAwareStatusBar
          barStyle={barStyle}
          backgroundColor={statusBarColor}
          translucent={translucent}
        />
        {!translucent && (
          <SafeAreaView
            style={(styles.container, { backgroundColor: statusBarColor })}
          />
        )}
        {headerUnScrollable()}
        {scrollEnabled ? (
          <KeyboardAwareScrollView
            style={[styles.container, { backgroundColor: backgroundColor }]}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          children
        )}
        {footerUnScrollable()}
      </View>
    );
  };

  return backgroundImage ? (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode={'cover'}>
      {content()}
    </ImageBackground>
  ) : (
    content()
  );
};

export default ScreenWrapper;
