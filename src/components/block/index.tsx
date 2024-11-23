import {HDP} from '@helpers';
import React, {FC} from 'react';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('window');

interface Props {
  flex?: ViewStyle['flex'];
  row?: boolean;
  justify?: ViewStyle['justifyContent'];
  justifyContent?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  alignItems?: ViewStyle['alignItems'];
  alignSelf?: ViewStyle['alignSelf'];
  content?: ViewStyle['alignContent'];
  alignContent?: ViewStyle['alignContent'];
  wrap?: ViewStyle['flexWrap'];
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  position?: ViewStyle['position'];
  top?: ViewStyle['top'];
  right?: ViewStyle['right'];
  gap?: number;
  bottom?: ViewStyle['bottom'];
  left?: ViewStyle['left'];
  color?: ViewStyle['backgroundColor'];
  outlined?: boolean;
  card?: boolean;
  radius?: ViewStyle['borderRadius'];
  overflow?: ViewStyle['overflow'];
  safe?: boolean;
  scroll?: boolean;
  scrollIn?: boolean;
  shadow?: {
    color?: ViewStyle['shadowColor'];
    offset?: ViewStyle['shadowOffset'];
    opacity?: ViewStyle['shadowOpacity'];
    radius?: ViewStyle['shadowRadius'];
  };
  children?: React.ReactNode;
  style?: any;
  bg?: string;
  onPress?: any;
  transparent?: boolean;
  refreshControl?: any;
  ref?: any;
  testID?: any;
  showScrollbar?: boolean;
  contentContainerStyle?: any;
  disabled?: boolean;
  isScrollable?: boolean;
  backgroundImage?: any;
  overlayColor?: string;
  backgroundScroll?: boolean;
  bounce?: boolean;
  activeOpacity?: number;
  scrollEventThrottle?: number;
}

export const Block: FC<Props> = ({
  children,
  style,
  flex,
  showScrollbar = false,
  row,
  justify,
  scrollIn,
  justifyContent,
  align,
  gap,
  alignItems,
  alignSelf,
  content,
  alignContent,
  wrap,
  width,
  height,
  position,
  top,
  right,
  bottom,
  left,
  onPress,
  color,
  outlined,
  card,
  radius,
  overflow,
  safe,
  scroll,
  shadow,
  bg,
  refreshControl,
  transparent = bg?.length ? false : true,
  testID,
  ref,
  contentContainerStyle,
  disabled,
  isScrollable = true,
  backgroundImage,
  overlayColor,
  backgroundScroll = false,
  bounce = false,
  activeOpacity,
  scrollEventThrottle,
  ...props
}) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && {flex},
    row && {flexDirection: 'row'},
    justify !== undefined && {justifyContent: justify},
    justifyContent !== undefined && {justifyContent},
    align !== undefined && {alignItems: align},
    alignItems !== undefined && {alignItems},
    alignSelf !== undefined && {alignSelf},
    content !== undefined && {alignContent: content},
    alignContent !== undefined && {alignContent},
    wrap !== undefined && {flexWrap: wrap},
    width !== undefined && {width},
    height !== undefined && {height},
    position !== undefined && {position},
    top !== undefined && {top},
    right !== undefined && {right},
    bottom !== undefined && {bottom},
    left !== undefined && {left},
    color !== undefined && {backgroundColor: color},
    gap !== undefined && {gap: HDP(gap)},
    outlined && {
      borderWidth: 1,
      borderColor: color,
      backgroundColor: 'transparent',
    },
    card && {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.07,
      shadowRadius: 4,
      elevation: 2,
    },
    radius !== undefined && {borderRadius: radius},
    bg !== undefined && !transparent && {backgroundColor: bg},
    overflow !== undefined && {overflow},
    shadow !== undefined && {...shadow},
    style,
  ]);

  const insets = useSafeAreaInsets();
  const idleHeight = getStatusBarHeight();

  const backdropStyle = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: '#16032E',
      paddingHorizontal: HDP(16),
      paddingVertical: HDP(50),
      overflow: 'hidden',
      minHeight: height,
      paddingTop: HDP(insets.top),
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
  });

  const renderContent = () => (
    <>
      {overlayColor && (
        <TouchableOpacity
          disabled={!onPress || disabled}
          style={[backdropStyle.overlay, {backgroundColor: overlayColor}]}
          onPress={() => {
            Keyboard.dismiss();
            if (onPress) {
              onPress();
            }
          }}></TouchableOpacity>
      )}
      <View testID={testID} ref={ref} style={[blockStyle]} {...props}>
        {children}
      </View>
    </>
  );

  if (backgroundImage) {
    const backgroundContent = (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={[backdropStyle.backdrop, style]}>
        {renderContent()}
      </ImageBackground>
    );

    if (backgroundScroll) {
      return (
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={showScrollbar}
          style={{flex: 1, backgroundColor: '#16032E'}}
          alwaysBounceVertical={bounce}
          bounces={bounce}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          scrollEnabled={isScrollable}>
          {backgroundContent}
        </KeyboardAwareScrollView>
      );
    }

    return backgroundContent;
  }

  if (safe) {
    return (
      <View
        testID={testID}
        ref={ref}
        style={[
          {
            paddingTop: HDP(insets.top),
            flex: 1,
            backgroundColor: bg,
          },
        ]}
        {...props}>
        <KeyboardAwareScrollView
          refreshControl={refreshControl}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
          style={[blockStyle]}
          alwaysBounceVertical={bounce}
          bounces={bounce}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          {...props}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  if (scroll) {
    return (
      <View
        testID={testID}
        style={{flex: 1, backgroundColor: bg, paddingTop: HDP(insets.top)}}
        {...props}>
        <KeyboardAwareScrollView
          scrollEventThrottle={scrollEventThrottle}
          refreshControl={refreshControl}
          ref={ref}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
          style={[blockStyle]}
          showsVerticalScrollIndicator={showScrollbar}
          scrollEnabled={isScrollable}
          alwaysBounceVertical={bounce}
          bounces={bounce}
          {...props}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  if (scrollIn) {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={contentContainerStyle}
        refreshControl={refreshControl}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="handled"
        style={blockStyle}
        showsVerticalScrollIndicator={showScrollbar}
        scrollEnabled={isScrollable}
        {...props}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  const handlePress = () => {
    Keyboard.dismiss();
    if (onPress) {
      onPress();
    }
  };

  if (!onPress) {
    return (
      <View testID={testID} ref={ref} style={blockStyle} {...props}>
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      testID={testID}
      ref={ref}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={blockStyle}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};
