/* eslint-disable @typescript-eslint/no-unused-vars */
import {SvgIcon} from '@components';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import style from './styles';

export const SplashScreen: FC = ({navigation}: any) => {
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        navigation.navigate('Auth', {screen: 'Login'});
      }, 3000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={style.container}>
      <Animatable.View animation="flash" direction="normal" duration={2000}>
        <Animatable.View animation="fadeIn" duration={2300}>
          <SvgIcon name="logo" size={160} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};
