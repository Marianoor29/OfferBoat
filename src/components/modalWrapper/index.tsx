import React, { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppColors from "../../utills/AppColors";
import { width } from "../../utills/Dimension";
import styles from "./styles";

export interface ModalHandles {
  show: () => void;
  hide: () => void;
}
type props = {
  onClose?: () => void
  innerContainerStyles?: object
  modalMainContainer?: object,
  modalContainer?: object,
  isColor?: boolean,
  close?: boolean,
  children?: ReactNode;
}
const ModalWrapper = (
  {
    onClose = () => null,
    innerContainerStyles = {},
    modalMainContainer = {},
    modalContainer = {},
    isColor = true,
    children = '',
    close = true,
  }: props,
  ref: React.Ref<ModalHandles>
) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      isVisible={visible}
      style={[styles.modalContainer, modalContainer]}
      avoidKeyboard={true}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      backdropColor={isColor ? 'black' : 'transparent'}
      animationInTiming={500}
      animationOutTiming={600}
      backdropOpacity={0.2}
    >
      <View style={[styles.modalInnerContainer, innerContainerStyles]}>
        <View style={styles.modalHeaderView}>
          {close && (
            <TouchableOpacity
              style={styles.topView}
              activeOpacity={0.6}
              onPress={() => setVisible(false)}
            >
              <AntDesign name='close' size={width(5)} color={AppColors.grey} />
            </TouchableOpacity>
          )}

          <View style={[styles.modalMainView, modalMainContainer]}>
            {children}
          </View>

        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(ModalWrapper);
