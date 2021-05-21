import R from '@app/assets/R';
import { SCREEN_ROUTER_AUTH } from '@app/config/screenType';
import NavigationUtil from '@app/navigation/NavigationUtil';
import { colors, fonts } from '@app/theme';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { FormValue } from './FormValue';
import Input from './Input';

const LoginSchema = Yup.object().shape({
  user_id: Yup.string()
    .min(5, 'Quá ngắn')
    .max(15, 'Quá dài')
    .required(R.strings().input_require_name),
  password: Yup.string().required(R.strings().input_require_password),
});

const FormLoginComponent = ({ onLogin }: { onLogin: (data: any) => void }) => {
  const [isShowPass, setIsShowPass] = useState(true);
  return (
    <Formik initialValues={FormValue} onSubmit={onLogin} validationSchema={LoginSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.form_InputLogin}>
            <Text children={R.strings().login} style={styles.txt_title} />
            <Input
              onChangeText={handleChange('user_id')}
              value={values.user_id}
              onBlur={handleBlur('user_id')}
              label={R.strings().label_name}
              placeholder={R.strings().placeholder_name}
              leftIcon={R.images.ic_user_input}
              errorMeg={errors.user_id}
            />
            <Input
              label={R.strings().label_password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder={R.strings().placeholder_password}
              leftIcon={R.images.ic_lock}
              secureTextEntry={isShowPass}
              hidePass={() => {
                setIsShowPass(!isShowPass);
              }}
              rightIcon={R.images.ic_hiddenPass}
              errorMeg={errors.password}
            />

            <View style={styles.btnForgot}>
              <Text
                onPress={() => {
                  NavigationUtil.navigate(SCREEN_ROUTER_AUTH.FORGOT_PASS);
                }}
                style={styles.txt_forgotPass}
                children={R.strings().forgot_password}
              />
            </View>

            <TouchableOpacity
              style={styles.btn_confirm}
              children={<Text style={styles.txt_confirm} children={R.strings().confirm} />}
              onPress={handleSubmit}
            />
            <Text style={styles.txt_register}>
              Bạn chưa có tài khoản?{'  '}
              <Text
                onPress={() => {
                  NavigationUtil.navigate(SCREEN_ROUTER_AUTH.REGISTER);
                }}
                style={{ color: colors.primary }}
                children={R.strings().register}
              />
            </Text>
          </View>
        </>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  txt_title: {
    ...fonts.semi_bold20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  txt_forgotPass: {
    ...fonts.regular16,
    fontSize: 15,
    color: colors.primary,
    marginTop: '5%',
  },
  form_InputLogin: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnForgot: {
    justifyContent: 'flex-end',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  btn_confirm: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 10,
  },
  txt_register: {
    ...fonts.regular16,
    textAlign: 'right',
    fontSize: 15,
    marginTop: 20,
  },
  txt_confirm: {
    ...fonts.semi_bold16,
    color: colors.white,
    paddingVertical: 12,
  },
});

const FormLogin = memo(FormLoginComponent, isEqual);

export default FormLogin;
