import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
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
        <Button title="Log in" onPress={() => onLogin()} />
      </View>
      <Button
        title="Create an account"
        onPress={() => navigation.navigate('Create an Account')}
        noFill
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default Login;
