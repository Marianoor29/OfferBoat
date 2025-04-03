import { forwardRef, useImperativeHandle, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownMenu from '../dropDownMenu';

// Define the ref type for the component
export interface FilePickerModalRef {
  show: () => void,
  hide: () => void,
  cleanTempImages: () => void,
}
// Define the props type for the component
type FilePickerModalProps = {
  onFilesSelected: (images: any) => void,
  multiple?: boolean;
  imageWidth?: any,
  imageHeight?: any,
  compressImageQuality?: any
  maxFiles?: any
}

const FilePickerModal= ({
  onFilesSelected, 
  multiple = false,
  imageWidth = 1080,
  imageHeight = 1920,
  compressImageQuality= 1,
  maxFiles
}: FilePickerModalProps, 
ref: any,
) => {
    const [isVisible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      show() {
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
      cleanTempImages() {
        ImagePicker.clean()
          .then(() => {
            console.log('removed all temp images from temp directory');
          })
          .catch(console.log);
      },
    }));

    function openCamera() {
      ImagePicker.openCamera({
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: compressImageQuality,
        width: imageWidth ? imageWidth : 1080,
        height: imageHeight ? imageHeight : 1920,
        multiple: multiple,
      }).then(onFilesSelected);
    }

    function openGallery() {
      ImagePicker.openPicker({
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: compressImageQuality,
        width: imageWidth ? imageWidth : 1080,
        height: imageHeight ? imageHeight : 1920,
        multiple: multiple,
        maxFiles:  maxFiles,
      }).then(onFilesSelected);
    }

    function openPicker(type = 0) {
      setVisible(false);
      setTimeout(type === 0 ? openCamera : openGallery, 400);
    }

    return (
      <DropDownMenu
        isVisible={isVisible}
        firstBtnText="Take Photo"
        secondBtnText="Choose from Library"
        onPressFirstBtn={() => openPicker(0)}
        onPressSecondBtn={() => openPicker(1)}
        onClose={() => setVisible(false)}
      />
    );
  }
export default forwardRef(FilePickerModal);
