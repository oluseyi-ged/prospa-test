/* eslint-disable react-native/no-inline-styles */
import {SizedBox} from '@components';
import {HDP, HP} from '@helpers';
import React, {useCallback} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const NavMenu = ({state, descriptors, navigation}: any) => {
  const {token} = useAppSelector<any>((store: RootState) => store);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const MenuIcons = useCallback(({label, status}: any) => {
    switch (label.toLowerCase()) {
      case 'more':
        return (
          <View>
            {/* <SvgIcon
              name={status ? 'more-active' : 'more-inactive'}
              size={25}
            /> */}
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              More
            </Text>
          </View>
        );
      case 'wallet':
        return (
          <View>
            {/* <SvgIcon
              name={status ? 'wallet-active' : 'wallet-inactive'}
              size={25}
            /> */}
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Wallet
            </Text>
          </View>
        );
      case 'trips':
        return (
          <View>
            {/* <SvgIcon
              name={status ? 'trips-active' : 'trips-inactive'}
              size={25}
            /> */}
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Trips
            </Text>
          </View>
        );
      default:
        return (
          <View>
            {/* <SvgIcon
              name={status ? 'home-active' : 'home-inactive'}
              size={25}
            /> */}
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Home
            </Text>
          </View>
        );
    }
  }, []);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: token?.length ? 'space-between' : 'space-evenly',
        alignSelf: 'center',
        paddingHorizontal: HDP(30),
        paddingBottom: HDP(Platform.OS === 'android' ? 4 : 10),
        position: 'absolute',
        bottom: HP(Platform.OS === 'android' ? -2 : -1.5),
        borderTopWidth: 1,
        borderTopColor: 'rgba(238, 238, 238, 0.25)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{justifyContent: 'center'}}>
            <View
              style={[
                {
                  alignItems: 'center',
                  paddingVertical: HDP(10),
                },
                // isFocused && {
                //   borderTopColor: '#6CCF00',
                //   borderTopWidth: 4,
                // },
              ]}>
              <MenuIcons label={label} status={isFocused} />
            </View>
            <View>
              <SizedBox height={1} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
