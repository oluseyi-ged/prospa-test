/* eslint-disable react-native/no-inline-styles */
import {SvgIcon} from '@components';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface Props {
  dialPadContent?: any;
  pinLength?: any;
  dialPadSize?: any;
  dialPadTextSize?: any;
  code?: any;
  setCode?: any;
}

export const DialpadKeypad: FC<Props> = ({
  dialPadContent,
  pinLength,
  code,
  setCode,
  dialPadSize,
  dialPadTextSize,
}) => {
  const navigation: any = useNavigation();

  return (
    <FlatList
      data={dialPadContent}
      numColumns={3} // set number of columns
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.dialBox}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            disabled={item === ''}
            onPress={() => {
              if (item === 'X') {
                setCode(prev => prev.slice(0, -1));
              } else {
                // if (code.length === pinLength - 1) {
                //   navigation.navigate('Home');
                // }
                setCode(prev => [...prev, item]);
              }
            }}>
            <View
              style={[
                {
                  backgroundColor: 'transparent',
                  // backgroundColor: item === '' ? 'transparent' : '#fff',
                  width: dialPadSize,
                  height: dialPadSize,
                },
                styles.dialPadContainer,
              ]}>
              {item === 'X' ? (
                <SvgIcon name={'close'} size={24} />
              ) : (
                <Text style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
                  {item}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
