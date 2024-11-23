/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {palette} from '@theme';
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
    <Block scroll style={styles.pageWrap}>
      <Block justifyContent="space-between">
        <Block style={styles.btmBox}>
          <SizedBox height={60} />

          <Text color="#fff" h3>
            Welcome back{'\n'}Shiwani
          </Text>
          <Text color="#fff" p>
            Don’t have an account with us? <Text color="#FA4A84">Sign up</Text>
          </Text>
          <SizedBox height={32} />
          <Formik
            initialValues={initialValues}
            onSubmit={async values => {
              setLoading(true);
              setTimeout(
                () =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  }),
                3000,
              );
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
                  placeholder="Enter email address"
                  label="Email address"
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
                  label="Password"
                  error={errors.password}
                  value={values.password}
                  autoCorrect={false}
                  type="password"
                />
                <SizedBox height={28} />

                <Button
                  radius={6}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    });
                  }}
                  // onPress={handleSubmit}
                  justifyContent="center"
                  alignItems="center"
                  color={palette.pink}
                  title="Sign in"
                  loading={loading}
                />

                <SizedBox height={30} />
                <Text p center color={'#FA4A84'}>
                  Forgot your password ?
                </Text>
                <SizedBox height={81} />
                <SvgIcon name="metrics" size={48} />
              </>
            )}
          </Formik>
        </Block>
      </Block>
    </Block>
  );
};
