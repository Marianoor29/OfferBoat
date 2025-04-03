import { useState } from 'react';
import { LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { LargeText, ScreenWrapper, SimpleHeader, SmallText } from '../../../../components';
import { OwnerFaqData } from '../../../../utills/enum';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const OwnerFAQ = ({ navigation }: any) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <SimpleHeader
          onPressFirstIcon={() => navigation.goBack()}
          emptyView={<LargeText size={4} textAlign={'center'}>Frequently Asked Questions (FAQs)</LargeText>}
        />
      )}
    >
      <View style={styles.container}>
        <SmallText size={3} textAlign={'justify'}>As an Offerboat operator, we value your time and have added the most commonly asked
         questions below for your convenience:</SmallText>
        {OwnerFaqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionWrapper}>
              <LargeText size={3.4}>{item.question}</LargeText>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.answerWrapper}>
                <SmallText size={3} textAlign={'justify'}>{item.answer}</SmallText>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default OwnerFAQ;
