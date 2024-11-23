import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: HDP(8),
    flexDirection: 'row',
    height: HDP(49),
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E5E5',
    paddingHorizontal: HDP(16),
  },
  label: {
    fontSize: RF(12),
    color: '#4C4D4D',
    fontFamily: family.Medium,
    alignSelf: 'flex-start',
  },
  error: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  bvnLength: {
    position: 'absolute',
    bottom: HDP(-5),
    right: 0,
    fontSize: RF(8),
    color: palette.grey,
  },
  info: {
    fontSize: RF(10),
    color: '#4C4D4D',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(8),
  },
});

export default styles;
