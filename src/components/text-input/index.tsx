/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
// import {SvgIcon} from '@components/svg-icon';
import {GradientBorderView} from '@good-react-native/gradient-border';
import {HDP, RF} from '@helpers';
import {palette} from '@theme';
import React, {FC, useEffect, useState} from 'react';
import {TextInput as TN, Text, View} from 'react-native';
import style from './styles';

interface Props {
  padding?: number;
  onSubmit?: () => void;
  // onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: any;
  onClear?: any;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  value?: any;
  containerStyle?: any;
  inputStyle?: any;
  marginTop?: number;
  textAlign?: 'left' | 'right' | 'center';
  error?: string;
  editable?: boolean;
  maxLength?: number;
  placeholder?: any;
  inputErrMsg?: any;
  charLength?: any;
  multiline?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad';
  textPaddingVertical?: number;
  bottomTitle?: string;
  rightIcon?: string;
  shouldFocus?: boolean;
  onTouchStart?: () => void;
  [x: string]: any;
  lessMargin?: boolean;
  isError?: boolean;
  label?: string;
  info?: string;
  type?: 'password' | 'text';
  iconName1?: string;
  iconName2?: string;
  iconSize1?: number;
  iconSize2?: number;
  onPress1?: any;
  onPress2?: any;
  placeholderTextColor?: string;
  numberOfLines?: number;
  innerStyle?: any;
  bordered?: boolean;
  white?: boolean;
  autoCorrect?: boolean;
  labelStyle?: any;
  firstText?: any;
  isAmount?: boolean;
  clearable?: boolean;
}
export const TextInput: FC<Props> = ({
  inputStyle,
  placeholder,
  placeholderTextColor = '#BABABB',
  keyboardType,
  onSubmit,
  onFocus,
  onBlur,
  editable,
  textAlign,
  textAlignVertical,
  multiline,
  refValue,
  value,
  maxLength,
  type,
  label,
  info,
  charLength = 0,
  onChangeText,
  iconName1,
  iconName2,
  isAmount,
  iconSize1,
  iconSize2,
  onPress1,
  onPress2,
  numberOfLines,
  innerStyle,
  bordered,
  shouldFocus,
  autoCorrect,
  white,
  error,
  labelStyle,
  firstText,
  clearable,
  onClear,
}) => {
  const [focused, setFocused] = useState(false);
  const [valueText, setValueText] = useState(0);
  const [secure, setSecure] = useState(type === 'password' ? true : false);
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    if (value) {
      setValueText(value.length);
    }
  }, [value]);

  const handleTextChange = inputText => {
    if (isAmount) {
      const numericText = inputText.replace(/[^0-9.]/g, '');
      const parts = numericText.split('.');
      if (parts?.length > 1) {
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const formattedText = `${integerPart}.${parts[1]}`;
        setFormattedValue(formattedText);
        onChangeText(inputText);
      } else {
        const formattedText = numericText.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setFormattedValue(formattedText);
        onChangeText(inputText);
      }
    } else {
      setFormattedValue(inputText);
      onChangeText(inputText);
    }
  };

  return (
    <View>
      {(value?.length || focused) && (
        <>
          <Text style={[style.label, labelStyle, white && {color: '#FA4A84'}]}>
            {label}
          </Text>
        </>
      )}

      <GradientBorderView
        gradientProps={{
          colors: focused ? ['#7E51FF', '#FA4A84'] : ['#FFFFFF', '#FFFFFF'],
        }}
        style={[
          style.inputContainer,
          inputStyle,
          bordered && style.bordered,
          focused && {borderColor: palette.mutedGreen},
        ]}>
        <View>
          {iconName1 && (
            <SvgIcon
              name={iconName1}
              size={iconSize1 || 20}
              onPress={onPress1}
              containerStyle={{marginRight: HDP(24)}}
            />
          )}
          {firstText && (
            <Text
              style={[
                {
                  color: bordered ? '#fff' : '#082932',
                  fontSize: RF(14),
                  paddingRight: HDP(10),
                },
              ]}>
              {firstText}
            </Text>
          )}
          <TN
            placeholder={placeholder}
            style={[
              {
                // padding,
                flex: 1,
                color: bordered ? '#fff' : '#fff',
                fontSize: RF(12),
              },
              innerStyle,
            ]}
            placeholderTextColor={bordered ? '#EAFFD270' : placeholderTextColor}
            onFocus={() => {
              onFocus;
              setFocused(true);
            }}
            onBlur={() => {
              onBlur;
              setFocused(false);
            }}
            maxLength={maxLength}
            editable={editable}
            secureTextEntry={secure}
            textAlign={textAlign}
            textAlignVertical={textAlignVertical || 'top'}
            multiline={multiline}
            onSubmitEditing={onSubmit}
            ref={refValue}
            // onChangeText={onChangeText}
            onChangeText={text => {
              onChangeText && onChangeText(text);
              handleTextChange(text);
            }}
            // value={value}
            value={!formattedValue?.length ? value : formattedValue}
            // keyboardType={keyboardType}
            keyboardType={isAmount ? 'numeric' : keyboardType}
            autoCapitalize={'none'}
            numberOfLines={numberOfLines}
            autoFocus={shouldFocus}
            autoCorrect={autoCorrect}
          />
          {clearable && valueText > 0 && (
            <>
              <SvgIcon name="check" size={iconSize2 || 16} />
              <SizedBox width={12} />
              <SvgIcon
                name="close"
                size={16}
                onPress={() => {
                  onClear();
                  setFormattedValue('');
                  setValueText(0);
                }}
              />
            </>
          )}
        </View>
      </GradientBorderView>

      {info && (
        <>
          <Text style={[style.info, white && {color: '#13556D'}]}>{info}</Text>
          <SizedBox height={8} />
        </>
      )}
      {charLength > 0 && (
        <Text style={[style.bvnLength]}>
          {valueText} /{charLength}
        </Text>
      )}
      {error?.length ? (
        <>
          <Text style={[style.error]}>{error}</Text>
          <SizedBox height={10} />
        </>
      ) : (
        <SizedBox height={10} />
      )}
    </View>
  );
};
