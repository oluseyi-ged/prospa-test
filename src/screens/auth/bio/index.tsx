/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, Text, TextInput} from '@components';
import {RF} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {useCreateWalletMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {useAppDispatch} from 'store';
import * as yup from 'yup';
import styles from './styles';

export const Bio: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };

  const initSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
  });

  const phoneInput = useRef<PhoneInput>(null);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      console.log('user', JSON.stringify(user));
      setUser(user);
    });

    return subscriber;
  }, []);

  const [createWallet, {isLoading, isSuccess, isError, error, data}]: any =
    useCreateWalletMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data?.data));
      navigation.navigate('Home');
    }
    if (isError) {
      flash.danger({
        description: error?.data?.message,
      });
    }
  }, [isSuccess, isError]);

  return (
    <Block safe style={styles.pageWrap}>
      <Block style={styles.btmBox}>
        <SizedBox height={80} />
        <Text h4 medium>
          Create Your Wallet
        </Text>
        <SizedBox height={8} />
        <Text p>First, let’s create your chi wallet to proceed.</Text>
        <SizedBox height={60} />
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={async values => {
            // proceed to add accounts
            createWallet({
              name: `${values?.firstName} ${values?.lastName}`,
              email: user?.email,
              firstName: values?.firstName,
              lastName: values?.lastName,
              phoneNumber: values?.phoneNumber,
              meta: {},
            });
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={initSchema}>
          {({errors, setFieldValue, values}) => (
            <Block position="relative">
              <TextInput
                onChangeText={value => {
                  setFieldValue('firstName', value);
                }}
                placeholder="First Name"
                error={errors.firstName}
                value={values.firstName}
                autoCorrect={false}
              />
              <SizedBox height={10} />
              <TextInput
                onChangeText={value => {
                  setFieldValue('lastName', value);
                }}
                placeholder="Last Name"
                error={errors.lastName}
                value={values.lastName}
                autoCorrect={false}
              />
              <SizedBox height={10} />
              <PhoneInput
                ref={phoneInput}
                defaultCode={'NG'}
                onChangeFormattedText={text => {
                  setFieldValue('phoneNumber', text);
                }}
                flagButtonStyle={styles.flagView}
                containerStyle={styles.containerView}
                textContainerStyle={styles.textContain}
                placeholder={'---'}
                codeTextStyle={{
                  color: '#868686',
                  fontSize: RF(12),
                }}
                // disabled
                layout="first"
                textInputStyle={styles.textStyle}
              />
              <SizedBox height={10} />
            </Block>
          )}
        </Formik>
        <Button
          radius={128}
          onPress={() => {
            formRef?.current?.handleSubmit();
          }}
          justifyContent="center"
          alignItems="center"
          color="#151515"
          style={styles.btn}
          title="Create"
          loading={isLoading}
        />
      </Block>
    </Block>
  );
};
