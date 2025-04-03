import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StatusBar, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { width } from "../../utills/Dimension";
import styles from "./styles";
import debounce from 'lodash.debounce';

type PhotosSliderProps = {
    onPressImage?: () => void,
    images: string[],
    sliderStyle?: object,
    sliderContainer?: object,
    sliderImageWidth?: any,
    sliderImageHeight?: any,
    arrowHeight?: any,
    enableZoom?: boolean,
    maxImages?: number,
};

const PhotosSlider = ({
    images = [],
    onPressImage = () => null,
    sliderStyle = {},
    sliderContainer = {},
    sliderImageWidth = width(94),
    sliderImageHeight = width(50),
    enableZoom = false,
    arrowHeight = 90,
    maxImages = 20,
}: PhotosSliderProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const carouselRef = useRef<ICarouselInstance | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [restartTimer, setRestartTimer] = useState<NodeJS.Timeout | null>(null);

    const limitedImages = images.slice(0, maxImages);

    // Preload images and manage loader
    useEffect(() => {
        const preloadImages = async () => {
            setIsLoading(true);
            await Promise.all(images.map(image => FastImage.preload([{ uri: image }])));
            setIsLoading(false);
        };
        preloadImages();
    }, [images]);

    // Restart autoplay with debounce
    const resetAutoplay = () => {
        if (restartTimer) clearTimeout(restartTimer);
        setIsAutoPlay(false);
        setRestartTimer(setTimeout(() => setIsAutoPlay(true), 5000));
    };

    // Handle arrow press with debounce
    const handleLeftPress = debounce(() => {
        if (carouselRef.current) {
            carouselRef.current.prev();
            resetAutoplay();
        }
    }, 300);

    const handleRightPress = debounce(() => {
        if (carouselRef.current) {
            carouselRef.current.next();
            resetAutoplay();
        }
    }, 300);

    // Open modal with zoom on image press
    const handleImagePress = (image: string) => {
        if (enableZoom) {
            setSelectedImage(image);
            setIsModalVisible(true);
        } else {
            onPressImage();
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedImage(null);
    };

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (restartTimer) clearTimeout(restartTimer);
        };
    }, [restartTimer]);

    // Render image with FastImage in ImageViewer
    const renderImageWithFastImage = (props: any) => (
        <FastImage
            style={props.style}
            source={{ uri: props.source.uri }}
            resizeMode={FastImage.resizeMode.contain}
        />
    );

    // Render each image item
    const renderImageItem = ({ item }: { item: string }) => (
        <Pressable onPress={() => handleImagePress(item)}>
            <FastImage
                source={{ uri: item, priority: FastImage.priority.high, cache: FastImage.cacheControl.web }}
                style={[
                    { width: sliderImageWidth, height: sliderImageHeight, borderTopLeftRadius: width(2), borderTopRightRadius: width(2) },
                    sliderStyle,
                ]}
                resizeMode={FastImage.resizeMode.cover}
                onLoad={() => setIsLoading(false)}
            />
        </Pressable>
    );

    return (
        <View style={[styles.container, sliderContainer]}>
            <View style={styles.carouselContainer}>
                <Pressable style={[styles.leftArrow, { left: 10, top: arrowHeight }]} onPress={handleLeftPress}>
                    <Icon name="chevron-left" size={30} color="#fff" />
                </Pressable>
                <View style={styles.carouselContainer}>
                    {isLoading && (
                        <ActivityIndicator size="large" color="#000" style={styles.loader} />
                    )}
                    <Carousel
                        ref={carouselRef}
                        width={sliderImageWidth}
                        height={sliderImageHeight}
                        data={limitedImages}
                        renderItem={renderImageItem}
                        loop
                        autoPlay={isAutoPlay}
                        autoPlayInterval={3000}
                        pagingEnabled
                    />
                </View>
                <Pressable style={[styles.rightArrow, { right: 10, top: arrowHeight }]} onPress={handleRightPress}>
                    <Icon name="chevron-right" size={30} color="#fff" />
                </Pressable>
            </View>
            {selectedImage && enableZoom && (
                <Modal
                    visible={isModalVisible}
                    transparent
                    onRequestClose={handleModalClose}
                >
                    <ImageViewer
                        imageUrls={limitedImages.map(image => ({ url: image }))}
                        index={limitedImages.indexOf(selectedImage)}
                        enableSwipeDown={false}
                        backgroundColor="black"
                        renderImage={renderImageWithFastImage}
                        renderHeader={() => <StatusBar backgroundColor="black" />}
                    />
                    <Pressable
                        style={[styles.backButton, { position: 'absolute', top: 40, left: 20, zIndex: 10 }]}
                        onPress={handleModalClose}
                    >
                        <Icon name="arrow-back" size={30} color="#fff" />
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};

export default PhotosSlider;
