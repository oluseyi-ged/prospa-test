/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, SizedBox, SvgIcon, Text} from '@components';
import {Avatar} from '@components/avatar';
import {HDP, transactions} from '@helpers';
import {calculatePercentages} from '@utils';
import React, {FC} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {default as styles} from './styles';

export const Home: FC = ({navigation}: any) => {
  const {width, height} = Dimensions.get('window');
  const accounts = [
    {
      money_in: 'N450,000.00',
      money_out: 'N250,000.00',
      difference: 'N150,000.00',
    },
    {
      money_in: 'N600,000.00',
      money_out: 'N400,000.00',
      difference: 'N200,000.00',
    },
    {
      money_in: 'N300,000.00',
      money_out: 'N150,000.00',
      difference: 'N150,000.00',
    },
  ];

  const result = calculatePercentages(accounts);

  const renderItem = ({item}) => (
    <Block
      onPress={() => {
        navigation.navigate('Account');
      }}
      style={styles.accountBox}
      width={width * 0.88}
      alignSelf="center"
      bg="#fff">
      <Text textTransform="uppercase">Current Account</Text>
      <Text color="#8397AB">PROVIDUS BANK - 9906533917</Text>
      <SizedBox height={15} />
      <Text color="#1C1335" h4>
        {item.money_in}
      </Text>
      <SizedBox height={15} />
      <Block row justify="space-between">
        <Text>Money in</Text>
        <Text color="#4CD964">{item.money_in}</Text>
      </Block>
      <SizedBox height={7} />
      <View style={[styles.statBar, {backgroundColor: '#4CD96450'}]}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#4CD964',
            width: item.money_out_percentage,
          }}
        />
      </View>
      <SizedBox height={20} />
      <Block row justify="space-between">
        <Text>Money out</Text>
        <Text color="#FA4A84">{item.money_out}</Text>
      </Block>
      <SizedBox height={7} />
      <View style={[styles.statBar, {backgroundColor: '#FEDBE6'}]}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#FA4A84',
            width: item.money_out_percentage,
          }}
        />
      </View>
      <SizedBox height={20} />
      <Block row justify="space-between">
        <Text>Difference</Text>
        <Text color="#FCBA06">{item.difference}</Text>
      </Block>
      <SizedBox height={7} />
      <View style={[styles.statBar, {backgroundColor: '#FCBA0650'}]}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#FCBA06',
            width: item.difference_percentage,
          }}
        />
      </View>
    </Block>
  );

  return (
    <Block bg="#fff" flex={1} scroll bounce showScrollbar={false}>
      <Block
        height={height * 0.2}
        bg="#1C1335"
        style={{
          paddingHorizontal: HDP(16),
        }}>
        <SizedBox height={20} />
        <Block justify="space-between" row alignItems="center">
          <Text h4 color="#fff">
            Hello Kathy!
          </Text>
          <Avatar
            shape="circle"
            name={'Indigo'}
            url={
              'https://images.pexels.com/photos/5060819/pexels-photo-5060819.jpeg?auto=compress&cs=tinysrgb&w=800'
            }
            size="tiny"
          />
        </Block>
      </Block>

      <SizedBox height={20} />
      <Block
        style={{
          paddingHorizontal: HDP(16),
          marginTop: HDP(-100),
        }}>
        <Block height={height * 0.3}>
          <FlatList
            data={result}
            horizontal
            pagingEnabled // Enables snap-to-place behavior
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
            snapToAlignment="center" // Ensures snapping aligns to the center
            decelerationRate="fast" // Makes snapping faster
            snapToInterval={width * 0.9 + 10} // Adjusts to match item width + spacing
            bounces={false}
          />
        </Block>

        <SizedBox height={20} />

        <Block
          bg="#fff"
          style={styles.accountBox}
          row
          alignItems="flex-start"
          justify="space-between">
          <Block>
            <Text textTransform="uppercase">Savings Account</Text>
            <Text color="#8397AB">SUB ACCOUNT - 12346789</Text>
            <SizedBox height={15} />
            <Text color="#1C1335" h4>
              N39,342.45
            </Text>
          </Block>
          <SvgIcon name="card" size={40} />
        </Block>

        <SizedBox height={15} />

        <LinearGradient
          colors={['#FA4A84', '#7E51FF', '#00D2FF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.linearGradient}>
          <View style={{width: '70%'}}>
            <Text color="#FFFFFF">
              Create multiple sub-accounts and manage your money with ease!
            </Text>
          </View>
          <SvgIcon name="plus" size={40} />
        </LinearGradient>

        <SizedBox height={15} />

        <Block bg="#fff" style={styles.accountBox}>
          <Block row justify="space-between">
            <Text color="#1C1335" p>
              Recent transactions
            </Text>
            <SvgIcon name="caret-right" size={12} />
          </Block>
          <SizedBox height={15} />
          {transactions?.slice(0, 3)?.map((tx, i) => {
            return (
              <Block
                key={i}
                row
                justify="space-between"
                style={{
                  borderStyle: i < transactions.length - 1 ? 'solid' : 'none',
                  borderBottomWidth: i < transactions.length - 1 ? 1 : 0,
                  borderColor: '#EFF0F2',
                  paddingVertical: HDP(14),
                }}>
                <Block row gap={16}>
                  <SvgIcon name={tx?.type} size={40} />
                  <Block>
                    <Text>{tx?.name}</Text>
                    <SizedBox height={5} />
                    <Text color="#8397AB">{tx?.time}</Text>
                  </Block>
                </Block>
                <Text>
                  {tx?.status === 'credit' ? '' : '-'}N
                  {tx?.amount?.toLocaleString()}
                </Text>
              </Block>
            );
          })}
        </Block>
      </Block>

      <SizedBox height={100} />
    </Block>
  );
};
