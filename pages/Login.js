import React from 'react';
import {View, StyleSheet} from 'react-native';
import useLogin from '../hooks/User/useLogin';
import {colours} from '../styles';
import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const Login = props => {
  const {
    email,
    validateEmail,
    emailValMes,
    onEmailChange,
    password,
    validatePW,
    pwValMes,
    onPasswordChange,
    onLogin,
  } = useLogin();
  return (
    <View style={styles.body}>
      <View style={styles.loginForm}>
        <Input
          label="Email Address"
          error={validateEmail}
          errorMessage={emailValMes}
          placeholder="eg. example@example.com"
          onChange={text => onEmailChange(text)}
          value={email}
        />
        <Input
          label="Password"
          error={validatePW}
          errorMessage={pwValMes}
          onChange={text => onPasswordChange(text)}
          value={password}
          password
        />
      </View>
      <Button title="Log in" onPress={() => onLogin()} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default Login;
