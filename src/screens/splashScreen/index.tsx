/* eslint-disable @typescript-eslint/no-unused-vars */
import {SvgIcon} from '@components';
import StorageHelper from '@helpers/StorageHelper';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import style from './styles';

export const SplashScreen: FC = ({navigation}: any) => {
  const [user, setUser] = useState<any>({});

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const userData = await StorageHelper.getItem(
            StorageHelper.StorageKeys.USER,
          );
          if (userData) {
            setUser(userData);
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          // setLoading(false);
        }
      };

      fetchUserData();
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        if (user?.name?.length) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Onboarding');
        }
      }, 3000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]),
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
