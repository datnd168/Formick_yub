import R from '@app/assets/R';
import FstImage from '@app/components/FstImage/FstImage';
import LoadingProgress from '@app/components/LoadingProgress';
// import { CALL_API_STATUS } from '@app/components/Progress/components/Circle/Constant';
import ScreenWrapper from '@app/components/Screen/ScreenWrapper';
import { SCREEN_ROUTER } from '@app/config/screenType';
import NavigationUtil from '@app/navigation/NavigationUtil';
import AsyncStoreService from '@app/service/AsyncStorage/AsyncStorageService';
import { colors, dimensions } from '@app/theme';
import { callAPIHook } from '@app/utils/CallApiHelper';
import React, { memo, useState } from 'react';
import isEqual from 'react-fast-compare';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import AuthApi from './AuthApi';
import { getUserInfo } from '@screen/App/Account/AccountSlice';
import FormLogin from './components/FormLogin';
import { CALL_API_STATUS } from '@app/config/constant';
import reactotron from 'reactotron-react-native';
interface LoginScreenProps {}

const LoginScreenComponent = (props: LoginScreenProps) => {
  const [isFetchingData, setIsFetchingData] = useState(false);

  const _onSubmit = async (data: any) => {
    const payload = {
      user_id: data?.user_id,
      password: data?.password,
      os_kind_id: '1',
      push_token: '2fsdfsdfbdnfshdfbsddfsd',
      login_again: '',
    };
    // return;
    callAPIHook({
      API: AuthApi.login,
      payload: payload,
      useLoading: setIsFetchingData,
      typeLoading: 'isLoading',
      onSuccess: async res => {
        if (res.result_code == CALL_API_STATUS.SUCCESS) {
          AsyncStoreService.putToken(res.result_detail[0]?.security_token);
          await AsyncStorage.setItem('user_id', res.result_detail[0]?.user_id);
          NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
          props.getUserInfo({ user_id: res.result_detail[0]?.user_id });
        }
        setIsFetchingData(false);
      },
      onError: error => {
        console.log('Error', error);
      },
    });
  };

  const RenderGoback = () => {
    return (
      <TouchableOpacity
        style={styles.containerBack}
        onPress={() => NavigationUtil.replace(SCREEN_ROUTER.MAIN)}
      >
        <FstImage style={styles.ic_back} source={R.images.ic_back} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <ScreenWrapper scroll unsafe backgroundColor={colors.white}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          extraScrollHeight={150}
          showsHorizontalScrollIndicator={false}
        >
          <FstImage
            resizeMode="cover"
            source={R.images.img_login}
            style={{ width: '100%', height: dimensions.height / 2.5 }}
          />
          <RenderGoback />
          <View style={styles.form_InputLogin}>
            <FormLogin onLogin={_onSubmit} />
          </View>
        </KeyboardAwareScrollView>
      </ScreenWrapper>
      {isFetchingData && <LoadingProgress />}
    </>
  );
};

const styles = StyleSheet.create({
  form_InputLogin: {
    position: 'relative',
    bottom: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: colors.white,
  },
  containerBack: {
    position: 'absolute',
    left: 10,
    top: dimensions.height * 0.05,
  },
  ic_back: {
    height: 36,
    width: 36,
  },
});
const LoginScreen = memo(LoginScreenComponent, isEqual);

const mapStateToProps = (state: any) => ({
  userSlice: state.userSlice,
});

const mapDispatchToProps = {
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

// export default LoginScreen;
