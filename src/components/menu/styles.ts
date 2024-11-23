import {RF} from '@helpers';
import {family} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navText: {
    fontSize: RF(11),
    fontFamily: family.Regular,
    color: '#8397AB',
  },
  navActive: {
    fontSize: RF(11),
    fontFamily: family.Medium,
    color: '#FA4A84',
  },
});

export default styles;
