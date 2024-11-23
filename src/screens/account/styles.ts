import {HDP} from '@helpers';
import {palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    // height,
    backgroundColor: 'red',
    marginBottom: HDP(200),
    flex: 1,
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
  container: {
    // paddingVertical: 20,
    // paddingHorizontal: HDP(10),
    // gap: HDP(10),
    // flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  active: {
    backgroundColor: '#FA4A84',
  },
  inactive: {
    backgroundColor: '#FFFFFF50',
  },
  accountBox: {
    // padding: HDP(16),
  },
  statBar: {
    width: '100%',
    height: HDP(3),
  },
  linearGradient: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    width: width * 0.9,
    alignSelf: 'center',
    padding: HDP(13),
  },
  mainBtn: {
    paddingVertical: HDP(20),
  },
});

export default style;
