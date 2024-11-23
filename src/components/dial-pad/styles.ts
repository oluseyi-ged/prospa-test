import {HDP} from '@helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginBottom: HDP(0),
    marginTop: HDP(0),
    borderRadius: 50,
    borderColor: 'transparent',
  },
  dialPadText: {
    color: '#000',
  },
  dialBox: {
    alignSelf: 'center',
  },
});

export default styles;
