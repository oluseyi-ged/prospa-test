/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Block,
  BottomSheet,
  Button,
  SizedBox,
  SvgIcon,
  Text,
  TextInput,
} from '@components';
import Rates from '@components/rates';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {useSendChiMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import style from './styles';

export const Send: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();
  const [origin, setOrigin] = useState<any>({});
  const [base, setBase] = useState<any>({});
  const [amt, setAmt] = useState(0);
  const [openDial, setOpenDial] = useState(false);
  const userData: any = useAppSelector((state: RootState) => state.auth);

  console.log(amt, base, origin);

  const initialValues = {
    sender: userData?.p_id,
    subAccount: userData?.p_id,
    originCurrency: '',
    // receiver: '1234567',
    email: '',
    phoneNumber: 'null',
    destinationCurrency: '',
    turnOffNotification: false,
    narration: '',
    amountToSend: '',
  };

  const initSchema = yup.object().shape({
    originCurrency: yup.string().required('Field is required'),
    destinationCurrency: yup.string().required('Field is required'),
    narration: yup.string().required('Field is required'),
    amountToSend: yup.string().required('Field is required'),
    email: yup.string().email().required('Recipient email is required'),
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

  useEffect(() => {
    if (amt) {
      formRef?.current?.setFieldValue('amountToSend', amt);
    }
    if (base?.key) {
      formRef?.current?.setFieldValue('destinationCurrency', base?.key);
    }
    if (origin?.key) {
      formRef?.current?.setFieldValue('originCurrency', origin?.key);
    }
  }, [amt, base, origin]);

  const [sendChi, {isLoading, isSuccess, isError, error, data}]: any =
    useSendChiMutation();

  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data?.data));
      navigation.navigate('Home');
    }
    if (isError) {
      flash.danger({
        description: error?.data?.error,
      });
    }
  }, [isSuccess, isError]);

  return (
    <Block safe style={style.pageWrap}>
      <Block style={style.btmBox}>
        <SvgIcon
          name="back"
          onPress={() => navigation.goBack()}
          size={40}
          containerStyle={{alignSelf: 'flex-start'}}
        />
        <SizedBox height={20} />
        <Text h4 medium>
          Send Chi
        </Text>
        <SizedBox height={8} />
        <Text p>Enter recipient details.</Text>
        <SizedBox height={60} />
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={async values => {
            console.log(values);
            sendChi(values);
            // proceed to add accounts
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={initSchema}>
          {({errors, setFieldValue, values}) => (
            <Block position="relative">
              <TouchableOpacity
                onPress={() => setOpenDial(true)}
                style={style.amtBox}>
                <Text color={amt > 0 ? '#000' : '#BABABB'}>
                  {amt < 1
                    ? 'Amount'
                    : `${origin?.key} ${Number(amt)?.toLocaleString()}`}
                </Text>
              </TouchableOpacity>
              <SizedBox height={20} />
              <TextInput
                onChangeText={value => {
                  setFieldValue('email', value);
                }}
                placeholder="Recipient email"
                error={errors.email}
                value={values.email}
                autoCorrect={false}
              />
              <SizedBox height={10} />
              <TextInput
                onChangeText={value => {
                  setFieldValue('narration', value);
                }}
                placeholder="Narration"
                error={errors.narration}
                value={values.narration}
                autoCorrect={false}
              />
              {/* <SizedBox height={10} />
              <PhoneInput
                ref={phoneInput}
                defaultCode={'NG'}
                onChangeFormattedText={text => {
                  setFieldValue('phoneNumber', text);
                }}
                flagButtonStyle={style.flagView}
                containerStyle={style.containerView}
                textContainerStyle={style.textContain}
                placeholder={'---'}
                codeTextStyle={{
                  color: '#868686',
                  fontSize: RF(12),
                }}
                // disabled
                layout="first"
                textInputStyle={style.textStyle}
              /> */}
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
          style={style.btn}
          title="Send"
          loading={isLoading}
        />
      </Block>
      <BottomSheet
        show={openDial}
        dropPress={() => setOpenDial(false)}
        afterHide={() => setOpenDial(false)}
        content={
          <Rates
            setBase={setBase}
            setAmount={setAmt}
            setOrigin={setOrigin}
            send={true}
            value={amt}
            close={() => setOpenDial(false)}
          />
        }
      />
    </Block>
  );
};
