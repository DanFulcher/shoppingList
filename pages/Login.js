import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
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
  const lists = props.route.params ? props.route.params.lists : null;
  return (
    <View style={styles.body}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.loginForm}>
          <Input
            label="Email Address"
            error={validateEmail}
            errorMessage={emailValMes}
            onChange={text => onEmailChange(text)}
            value={email}
            type="email-address"
          />
          <Input
            label="Password"
            error={validatePW}
            errorMessage={pwValMes}
            onChange={text => onPasswordChange(text)}
            value={password}
            password
          />
          <Button title="Log in" onPress={() => onLogin(lists)} />
        </View>
        <Text style={styles.formText}>
          New to the app? Create an account to start creating and sharing lists
        </Text>
        <Button
          title="Create an account"
          onPress={() => navigation.navigate('Create an Account')}
          noFill
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
  loginForm: {
    marginBottom: 75,
  },
  formText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;
