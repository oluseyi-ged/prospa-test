/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import * as yup from 'yup';
import styles from './styles';

export const Login: FC = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const initSchema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <Block safe style={styles.pageWrap}>
      <Block justifyContent="space-between">
        <Block style={styles.btmBox}>
          <SvgIcon
            name="back"
            onPress={() => navigation.goBack()}
            size={40}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={138} />

          <Text h4 medium>
            Welcome Back
          </Text>
          <SizedBox height={32} />
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              setLoading(true);
              auth()
                .signInWithEmailAndPassword(values?.email, values?.password)
                .then(user => {
                  console.log(user);
                  // proceed to home screen
                  navigation.navigate('Home');
                })
                .catch(error => {
                  setLoading(false);

                  console.log(error);
                  if (error.code === 'auth/invalid-email')
                    flash.danger({
                      description: error.message,
                    });
                  else if (error.code === 'auth/user-not-found')
                    flash.danger({
                      description: 'No User Found',
                    });
                  else {
                    flash.danger({
                      description: 'Please check your email id or password',
                    });
                  }
                });
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values, handleSubmit}) => (
              <>
                <TextInput
                  onChangeText={value => {
                    setFieldValue('email', value);
                  }}
                  placeholder="Email"
                  error={errors.email}
                  value={values.email}
                  autoCorrect={false}
                />
                <SizedBox height={16} />
                <TextInput
                  onChangeText={value => {
                    setFieldValue('password', value);
                  }}
                  placeholder="Password"
                  error={errors.password}
                  value={values.password}
                  autoCorrect={false}
                  type="password"
                />
                <SizedBox height={24} />

                <Button
                  radius={128}
                  onPress={handleSubmit}
                  justifyContent="center"
                  alignItems="center"
                  color="#151515"
                  title="Login"
                  loading={loading}
                />
              </>
            )}
          </Formik>
        </Block>
      </Block>
    </Block>
  );
};
