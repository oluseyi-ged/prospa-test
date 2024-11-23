import {HDP} from '@helpers';
import {palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    height,
    backgroundColor: '#fff',
    paddingHorizontal: HDP(24),
  },
  walletBG: {
    padding: HDP(10),
  },
  sendBtn: {
    backgroundColor: palette.purpleFade,
    paddingVertical: HDP(15),
    borderRadius: HDP(8),
  },
  statusBg: {
    width: width * 0.2,
    alignSelf: 'center',
    paddingVertical: HDP(9),
    borderRadius: HDP(5),
  },
});

export default style;
