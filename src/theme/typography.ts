import {Platform} from 'react-native';

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  Light: Platform.select({
    ios: 'OatmealPro-Light', // The font family name
    android: 'OatmealPro-Light', // The file name
  }),
  XLight: Platform.select({
    ios: 'OatmealPro-ExtraLight', // The font family name
    android: 'OatmealPro-ExtraLight', // The file name
  }),
  Bold: Platform.select({
    ios: 'OatmealPro-Bold', // The font family name
    android: 'OatmealPro-Bold', // The file name
  }),
  Regular: Platform.select({
    ios: 'OatmealPro-Regular', // The font family name
    android: 'OatmealPro-Regular', // The file name
  }),
  Medium: Platform.select({
    ios: 'OatmealPro-Medium', // The font family name
    android: 'OatmealPro-Medium', // The file name
  }),
  SemiBold: Platform.select({
    ios: 'OatmealPro-SemiBold', // The font family name
    android: 'OatmealPro-SemiBold', // The file name
  }),
};
