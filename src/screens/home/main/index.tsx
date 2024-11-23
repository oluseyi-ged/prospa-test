/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, BottomSheet, SizedBox, SvgIcon, Text} from '@components';
import Rates from '@components/rates';
import {HDP} from '@helpers';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';
import {useGetRatesQuery, useLazyGetWalletsQuery} from '@services/queryApi';
import {setRates} from '@slices/rates';
import {palette} from '@theme';
import {transformRates} from '@utils';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import {default as styles} from './styles';

export const Home: FC = ({navigation}: any) => {
  const {width, height} = Dimensions.get('window');
  const [calcOpen, setCalcOpen] = useState(false);
  const userData: any = useAppSelector((state: RootState) => state.auth);
  const ratesArr: any = useAppSelector((state: RootState) => state.rates);
  const [user, setUser] = useState<any>(null);
  const dispatch = useAppDispatch();

  const [fire, {data: walletData, isLoading: walletLoad}]: any =
    useLazyGetWalletsQuery();

  const {
    data: rates,
    isLoading: ratesLoad,
    isSuccess: ratesTrue,
  } = useGetRatesQuery(null, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const getTotalBalance = () => {
    return walletData?.data?.wallets?.reduce(
      (total, wallet) => total + wallet.balance,
      0,
    );
  };

  let transactions: any = [];

  walletData?.data?.wallets.forEach(wallet => {
    if (wallet.transactions && Array.isArray(wallet.transactions)) {
      wallet.transactions.forEach(transaction => {
        let formattedTransaction: any = {
          amount: transaction.amount,
          description: transaction.description,
          type: wallet.type, // Fetching type from the parent wallet object
        };

        // Determine kind (debit or credit) based on balance changes
        if (transaction.balanceBefore && transaction.newBalance) {
          const balanceBefore = parseFloat(transaction.balanceBefore);
          const newBalance = parseFloat(transaction.newBalance);

          if (newBalance < balanceBefore) {
            formattedTransaction.kind = 'debit';
          } else {
            formattedTransaction.kind = 'credit';
          }
        }

        // Convert meta?.date to real date format if it exists
        if (transaction.meta && transaction.meta.date) {
          formattedTransaction.date = new Date(transaction.meta.date);
        }

        transactions.push(formattedTransaction);
      });
    }
  });

  useEffect(() => {
    if (ratesTrue) {
      dispatch(setRates(transformRates(rates?.data)));
    }
  }, [ratesTrue]);

  useFocusEffect(
    React.useCallback(() => {
      fire(userData?.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });

    return subscriber;
  }, []);

  const usdToNgn = ratesArr?.find(
    rate => rate?.origin === 'USD' && rate?.base === 'NGN',
  );

  return (
    <Block style={styles.pageWrap}>
      <Block scroll showScrollbar={false}>
        <SizedBox height={20} />
        <Text>Hello {userData?.firstName} Chi</Text>
        <SizedBox height={30} />
        <Block bg="#0C212F20" radius={8} style={styles.walletBG}>
          <Block transparent row>
            <Block transparent>
              <Text color={palette.purple} p>
                Total Chi Value:
              </Text>
              <Text bold h4>
                $
                {walletLoad
                  ? '--:--'
                  : getTotalBalance()?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </Text>
            </Block>
            <SvgIcon
              name="calc"
              size={38}
              onPress={() => setCalcOpen(!calcOpen)}
            />
          </Block>
          <SizedBox height={20} />
          <Block transparent alignSelf="center">
            <SizedBox height={2} backgroundColor={'#000'} width={width * 0.8} />
          </Block>
          <SizedBox height={20} />
          <Text h6>
            $1 = N{usdToNgn?.rate?.toLocaleString()} | Exchange rate today
          </Text>
          <SizedBox height={10} />
        </Block>
        <SizedBox height={30} />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => navigation.navigate('Send')}>
          <Text center color={'#fff'} h6>
            Send Chi
          </Text>
        </TouchableOpacity>
        <SizedBox height={30} />

        <Block>
          <Text p>Recent Transactions</Text>
        </Block>

        <SizedBox height={30} />

        {transactions?.length ? (
          <Block height={height * 0.5}>
            <FlatList
              contentContainerStyle={{
                paddingVertical: HDP(5),
                display: 'flex',
                paddingHorizontal: HDP(5),
                gap: HDP(12),
                // height: height * 0.4,
              }}
              data={transactions}
              renderItem={({item}) => (
                <Block
                  radius={10}
                  style={{padding: HDP(20)}}
                  bg="#151A2920"
                  row
                  justifyContent="space-between">
                  <Block transparent row gap={16}>
                    <SvgIcon name={item?.kind?.toLowerCase()} size={34} />
                    <Block transparent gap={6}>
                      <Text color="#000" h6>
                        $ {item?.amount}
                      </Text>
                      <Text s>
                        {item?.type} - {item?.description}
                      </Text>
                    </Block>
                  </Block>
                </Block>
              )}
            />
            <SizedBox height={30} />
          </Block>
        ) : (
          <Block transparent>
            <SvgIcon name="ice" size={100} />
            <SizedBox height={10} />
            <Text center p>
              Oops! No transactions yet.
            </Text>
          </Block>
        )}
      </Block>
      <BottomSheet
        show={calcOpen}
        dropPress={() => setCalcOpen(false)}
        afterHide={() => setCalcOpen(false)}
        content={<Rates close={() => setCalcOpen(false)} />}
      />
    </Block>
  );
};
