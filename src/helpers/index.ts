/* eslint-disable @typescript-eslint/no-unused-vars */
import {Dimensions, PixelRatio} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export * from './consts';
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WEIGHT = Dimensions.get('window').width;

export function RF(size: number) {
  let factor = PixelRatio.get();
  if (factor >= 2 && factor < 3) {
    // iphone 5s and older Androids
    if (SCREEN_WEIGHT < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (SCREEN_HEIGHT < 667) {
      return size;
      // iphone 6-6s
    }
    if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (factor >= 3 && factor < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (SCREEN_WEIGHT <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (SCREEN_HEIGHT < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (factor >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (SCREEN_WEIGHT <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (SCREEN_HEIGHT < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
}

export const getWidthPercentage = (
  value: number,
  creativeWidth = SCREEN_WEIGHT,
) => (value / creativeWidth) * 100;

export const getHeightPercentage = (
  value: number,
  creativeHeight = SCREEN_WEIGHT,
) => (value / creativeHeight) * 100;

export function HDP(size: number) {
  return PixelRatio.roundToNearestPixel(size);
}

export function MH(height: number) {
  return (height / 100) * SCREEN_HEIGHT;
}

export function WP(size: number) {
  return widthPercentageToDP(size);
}

export function HP(size: number) {
  return heightPercentageToDP(size);
}

// new
export const RW = (value: number) => {
  return widthPercentageToDP(getWidthPercentage(value));
};

export const RH = (value: number) => {
  return heightPercentageToDP(getHeightPercentage(value));
};
