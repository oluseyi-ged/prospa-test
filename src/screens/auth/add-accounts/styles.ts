import {HDP} from '@helpers';
import {HS, VS} from '@utils/metrics';
import {Dimensions, StyleSheet} from 'react-native';

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
  },
  showTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floater: {
    position: 'absolute',
    bottom: HDP(0),
    paddingBottom: HDP(100),
    paddingTop: HDP(50),
    width,
    // backgroundColor: '#ffffff',
  },
});

export default style;
