import {HDP, RF} from '@helpers';
import {HS, VS} from '@utils/metrics';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    height,
    backgroundColor: '#F0F0F0',
  },
  gif: {
    width: HS(240),
    height: VS(240),
    alignSelf: 'center',
  },
  btmBox: {
    paddingHorizontal: HDP(24),
  },
  btn: {
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: HDP(50),
  },
  aviNull: {
    backgroundColor: '#E6E6E6',
    height: HDP(100),
    width: HDP(100),
    justifyContent: 'center',
    borderRadius: HDP(1000),
    alignSelf: 'center',
  },
  optBox: {
    backgroundColor: '#fff',
    borderRadius: HDP(12),
    width: width * 0.7,
    alignSelf: 'center',
    position: 'absolute',
    top: HDP(120),
    zIndex: 10000,
    // marginTop: HDP(20),
  },
  optItem: {
    padding: HDP(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divide: {
    width: '100%',
    height: 1,
    backgroundColor: '#11111140',
  },
  flagView: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: HDP(8),
    borderBottomLeftRadius: HDP(8),
    borderRightWidth: 1,
    borderWidth: 1,
    borderColor: '#928B80',
    borderRightColor: '#928B8080',
  },
  textContain: {
    backgroundColor: 'transparent',
    borderTopRightRadius: HDP(8),
    borderBottomRightRadius: HDP(8),
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#928B80',
    paddingVertical: Platform.OS === 'android' ? HDP(2) : HDP(14),
  },
  textStyle: {
    color: '#868686',
    fontSize: RF(12),
  },
  containerView: {
    borderRadius: HDP(8),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  amtBox: {
    borderRadius: HDP(8),
    flexDirection: 'row',
    height: HDP(49),
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E5E5',
    paddingHorizontal: HDP(16),
  },
});

export default style;
