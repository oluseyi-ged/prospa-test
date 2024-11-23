/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {HDP} from '@helpers';
import StorageHelper from '@helpers/StorageHelper';
import {GlassView} from '@metafic-co/react-native-glassmorphism';
import React, {FC, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';

export const AddAccounts: FC = ({navigation}: any) => {
  const [user, setUser] = useState<any>({});
  const [categories, setCategories] = useState([
    {
      category: 'Social',
      isOpen: true,
      apps: [
        {name: 'Instagram', username: ''},
        {name: 'Tiktok', username: ''},
        {name: 'Reddit', username: ''},
        {name: 'Linkedin', username: ''},
        {name: 'Snapchat', username: ''},
        {name: 'Twitter', username: ''},
        {name: 'Facebook', username: ''},
        {name: 'Threads', username: ''},
        // Add more social apps here if needed
      ],
    },
    {
      category: 'Video',
      isOpen: true,
      apps: [
        {name: 'YouTube', username: ''},
        {name: 'Twitch', username: ''},
        // Add more video apps here if needed
      ],
    },
    {
      category: 'Messaging',
      isOpen: true,
      apps: [
        {name: 'Telegram', username: ''},
        {name: 'WhatsApp', username: ''},
        // Add more messaging apps here if needed
      ],
    },
    {
      category: 'Music',
      isOpen: true,
      apps: [
        {name: 'Spotify', username: ''},
        {name: 'Soundcloud', username: ''},
        // Add more messaging apps here if needed
      ],
    },
    {
      category: 'E-commerce',
      isOpen: true,
      apps: [
        {name: 'Shopify', username: ''},
        {name: 'eBay', username: ''},
        // Add more design apps here if needed
      ],
    },
    {
      category: 'Design',
      isOpen: true,
      apps: [
        {name: 'Behance', username: ''},
        {name: 'Dribbble', username: ''},
        {name: 'Pinterest', username: ''},
        {name: 'Figma', username: ''},
        // Add more design apps here if needed
      ],
    },
    {
      category: 'Coding',
      isOpen: true,
      apps: [
        {name: 'GitHub', username: ''},
        // Add more coding apps here if needed
      ],
    },
  ]);

  const fetchUserData = async () => {
    const userData = await StorageHelper.getItem(
      StorageHelper.StorageKeys.USER,
    );
    return userData; // Return the entire user data object
  };

  fetchUserData().then(userData => {
    if (userData) {
      setUser(userData);
    } else {
      console.log('User data not found');
    }
  });

  const hasNonEmptyUsername = categories.some(category =>
    category.apps.some(app => app.username !== ''),
  );

  const toggleAccordion = index => {
    const updatedCategories = [...categories];
    updatedCategories[index].isOpen = !updatedCategories[index].isOpen;
    setCategories(updatedCategories);
  };

  const handleUsernameChange = (categoryIndex, appIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].apps[appIndex].username = value;
    setCategories(updatedCategories);
  };

  const handleButtonPress = async () => {
    interface App {
      name: string;
      username: string;
    }

    const filledApps: App[] = categories.reduce(
      (accumulator: App[], category) => {
        category.apps.forEach((app: App) => {
          if (app.username !== '') {
            accumulator.push({name: app.name, username: app.username});
          }
        });
        return accumulator;
      },
      [],
    );

    try {
      // Retrieve existing user data from AsyncStorage
      const existingUserData = await StorageHelper.getItem(
        StorageHelper.StorageKeys.USER,
      );

      // Update existingUserData with new form values
      const updatedUserData = {
        ...existingUserData,
        accounts: filledApps,
      };

      // Save updatedUserData back to AsyncStorage
      await StorageHelper.saveItem(
        StorageHelper.StorageKeys.USER,
        updatedUserData,
      );

      // Proceed to dashboard after saving data
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const firstName = user?.name?.split(' ')[0];

  return (
    <Block style={styles.pageWrap}>
      <Block scroll>
        <Block style={styles.btmBox}>
          <SvgIcon
            name="back"
            onPress={() => navigation.goBack()}
            size={40}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={15} />

          <Text textTransform="capitalize" h4 medium>
            Welcome, {firstName}!
          </Text>
          <SizedBox height={8} />
          <Text p>Now, let’s add your account handles to your Circle.</Text>
          <SizedBox height={32} />
          {categories.map((category, categoryIndex) => (
            <View key={category.category}>
              <TouchableOpacity
                style={styles.showTrigger}
                onPress={() => toggleAccordion(categoryIndex)}>
                <Text bold h6>
                  {category.category}
                </Text>
                <SvgIcon
                  name={category.isOpen ? 'caret-up' : 'caret-down'}
                  size={32}
                />
              </TouchableOpacity>
              {/* Dropdown for each category */}
              {category.isOpen &&
                // Dropdown for each category
                category.apps.map((app, appIndex) => (
                  <View key={app.name}>
                    <TextInput
                      value={app.username}
                      firstText={'@'}
                      iconSize1={40}
                      onChangeText={value =>
                        handleUsernameChange(categoryIndex, appIndex, value)
                      }
                      autoCorrect={false}
                      iconName1={app.name.toLowerCase()}
                      placeholder="Enter username"
                      inputStyle={{height: HDP(64)}}
                      clearable
                      onClear={() => {
                        handleUsernameChange(categoryIndex, appIndex, '');
                      }}
                    />
                    <SizedBox height={12} />
                  </View>
                ))}
            </View>
          ))}
        </Block>
        <SizedBox height={200} />
      </Block>
      <GlassView containerStyle={styles.floater}>
        <Button
          radius={128}
          onPress={handleButtonPress}
          justifyContent="center"
          alignItems="center"
          color="#151515"
          style={styles.btn}
          title="Next"
          disabled={!hasNonEmptyUsername}
        />
      </GlassView>
    </Block>
  );
};
