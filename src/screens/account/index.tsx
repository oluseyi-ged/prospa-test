/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, BottomSheet, SizedBox, SvgIcon, Text} from '@components';
import {HDP, transactions} from '@helpers';
import {calculatePercentages} from '@utils';
import React, {FC, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import {default as styles} from './styles';

export const Account: FC = ({navigation}: any) => {
  const {width, height} = Dimensions.get('window');
  const [currentPage, setCurrentPage] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

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

  const PaginationDots = val => {
    const numDots = result.length;
    console.log(val, currentPage, 'snowflake');

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingLeft: HDP(35),
        }}>
        {Array(numDots)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === val?.current ? styles.active : styles.inactive,
              ]}
            />
          ))}
      </View>
    );
  };

  const renderItem = ({item}) => (
    <Block style={styles.accountBox} width={width} alignSelf="center" bg="#fff">
      <Block bg="#1C1335">
        <Block row justify="space-between" style={{padding: HDP(16)}}>
          <SvgIcon
            onPress={() => navigation.goBack()}
            name="cancel"
            size={16}
          />
          <PaginationDots current={currentPage} />
          <TouchableOpacity
            onPress={() => {
              setShowOptions(true);
            }}>
            <Text color="#FA4A84">Options</Text>
          </TouchableOpacity>
        </Block>

        <SizedBox height={25} />

        <Text color="#8397AB" center textTransform="uppercase">
          SAVINGS ACC ***1234
        </Text>
        <SizedBox height={8} />
        <Text color="#FFFFFF" center h4>
          {item.money_in}
        </Text>
        <SizedBox height={20} />
      </Block>

      <SizedBox height={30} />

      <Block row gap={56} justify="center">
        <Block gap={8}>
          <SvgIcon name="transfer-icon" size={42} />
          <Text center color="#FA4A84">
            Transfer
          </Text>
        </Block>
        <Block gap={8}>
          <SvgIcon name="utilities" size={42} />
          <Text center color="#FA4A84">
            Utilities
          </Text>
        </Block>
        <Block gap={8}>
          <SvgIcon name="credit" size={42} />
          <Text center color="#FA4A84">
            Card
          </Text>
        </Block>
      </Block>

      <SizedBox height={45} />
      <Block style={{paddingHorizontal: HDP(20)}} row justify="space-between">
        <Text>Summary</Text>
        <Block row gap={4}>
          <Text color="#8397AB">This month</Text>
          <SvgIcon name="down" size={12} />
        </Block>
      </Block>
      <SizedBox height={22} />

      <Block style={{paddingHorizontal: HDP(20)}}>
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

        <SizedBox height={30} />
        <Text p>Today</Text>
        <SizedBox height={20} />

        {transactions?.map((tx, i) => {
          return (
            <Block
              key={i}
              row
              justify="space-between"
              style={{
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
  );

  const scrollEnd = e => {
    const {x} = e.nativeEvent.contentOffset;
    const scrolledPage = Math.floor(x / width);
    setCurrentPage(scrolledPage);
  };

  return (
    <Block bg="#fff" flex={1} scroll bounce showScrollbar={false}>
      <Block
        style={
          {
            // paddingHorizontal: HDP(16),
          }
        }>
        <Block>
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
            snapToInterval={width} // Adjusts to match item width + spacing
            bounces={false}
            onScroll={e => scrollEnd(e)}
          />
        </Block>
      </Block>

      <BottomSheet
        show={showOptions}
        afterHide={() => setShowOptions(false)}
        dropPress={() => setShowOptions(false)}
        modalStyle={{
          backgroundColor: 'transparent',
          paddingHorizontal: HDP(10),
          paddingVertical: HDP(15),
        }}
        content={
          <Block gap={7}>
            <Block bg="#E9E8EB" radius={6}>
              <TouchableOpacity style={styles.mainBtn}>
                <Text p center color="#007AFF">
                  Saving rules
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#8397AB',
                  height: HDP(1),
                }}
              />
              <TouchableOpacity style={styles.mainBtn}>
                <Text p center color="#FF3B30">
                  Delete account
                </Text>
              </TouchableOpacity>
            </Block>

            <TouchableOpacity
              onPress={() => setShowOptions(false)}
              style={[
                styles.mainBtn,
                {backgroundColor: '#fff', borderRadius: HDP(6)},
              ]}>
              <Text p bold center color="#979797">
                Cancel
              </Text>
            </TouchableOpacity>
          </Block>
        }
      />
    </Block>
  );
};
