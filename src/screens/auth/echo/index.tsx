/* eslint-disable @typescript-eslint/no-unused-vars */
import {LogoGif} from '@assets/images';
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import React, {FC, useRef, useState} from 'react';
import {Image} from 'react-native';
import * as yup from 'yup';
import styles from './styles';

export const Echo: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const initSchema = yup.object().shape({
    email: yup.string()?.email().required('Email is required'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
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
          <Image source={LogoGif} style={[styles.gif]} />
          <Text h4 medium>
            Create your chi!
          </Text>
          <SizedBox height={24} />

          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            onSubmit={async values => {
              setLoading(true);
              auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .then(userCredential => {
                  const user = userCredential.user;
                  console.log(
                    'Registration Successful. Please Login to proceed',
                  );
                  console.log(user);

                  // Optionally update user profile (displayName, photoURL)
                  // auth().currentUser.updateProfile({
                  //   displayName: userName,
                  //   photoURL: 'https://example.com/profile.png',
                  // })
                  // .then(() => {
                  //   // Route to next page
                  //   navigation.navigate('Bio');
                  // })
                  // .catch(error => {
                  //   console.error('Error updating profile:', error);
                  // });

                  // Route to next page
                  navigation.navigate('Bio');
                })
                .catch(error => {
                  setLoading(false);

                  console.log('Registration Error:', error);

                  if (error.code === 'auth/email-already-in-use') {
                    flash.danger({
                      description: 'That email address is already in use!',
                    });
                  } else {
                    flash.danger({
                      description: error.message,
                    });
                  }
                });
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values}) => (
              <>
                <TextInput
                  onChangeText={value => {
                    setFieldValue('email', value);
                  }}
                  placeholder="email"
                  error={errors.email}
                  value={values.email}
                  autoCorrect={false}
                />
                <SizedBox height={10} />
                <TextInput
                  onChangeText={value => {
                    setFieldValue('password', value);
                  }}
                  placeholder="*******"
                  error={errors.password}
                  value={values.password}
                  autoCorrect={false}
                  type="password"
                />
              </>
            )}
          </Formik>
        </Block>
        <Button
          radius={128}
          onPress={() => formRef?.current?.handleSubmit()}
          justifyContent="center"
          alignItems="center"
          color="#151515"
          style={styles.btn}
          title="Create Account"
        />
      </Block>
    </Block>
  );
};
