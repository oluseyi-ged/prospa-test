import {RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navText: {
    fontSize: RF(9),
    fontFamily: family.Regular,
    color: palette.lightText,
  },
  navActive: {
    fontSize: RF(9),
    fontFamily: family.Medium,
    color: palette.blue,
  },
});

export default styles;
