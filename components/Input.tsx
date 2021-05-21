import FstImage from '@app/components/FstImage/FstImage';
import { colors, fonts } from '@app/theme';
import { isEqual } from 'lodash';
import React, { memo } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input, Text } from 'react-native-elements';

interface InputProps {
  placeholder?: string;
  leftIcon?: any;
  rightIcon?: any;
  label?: string;
  secureTextEntry?: boolean;
  errorMeg?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  hidePass?: () => void;
  value?: string;
}
const InputComponent = (props: any) => {
  const {
    placeholder,
    leftIcon,
    rightIcon,
    label,
    secureTextEntry,
    errorMeg,
    onChangeText,
    hidePass,
    onBlur,
    value,
  } = props;

  return (
    <View>
      <Input
        label={() => <Text style={styles.labelStyle} children={label} />}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoCapitalize={'none'}
        value={value}
        errorMessage={errorMeg}
        errorStyle={styles.errorStyle}
        inputContainerStyle={{ borderBottomColor: colors.primary }}
        leftIcon={
          <FstImage
            source={leftIcon}
            style={{ width: 20, height: 20, marginRight: 5 }}
            resizeMode={'contain'}
          />
        }
        rightIcon={
          !!rightIcon && (
            <TouchableOpacity onPress={hidePass}>
              <FstImage
                source={rightIcon}
                style={{ width: 20, height: 20 }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    ...fonts.regular15,
    color: colors.black,
  },
  errorStyle: {
    fontSize: 15,
  },
});

const RNInput = memo(InputComponent, isEqual);

export default RNInput;
