import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {colours} from '../styles';
import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [emailValMes, setEmailValMes] = useState(
    'Please enter a valid email address',
  );
  const [validatePW, setValidatePW] = useState(false);
  const [pwValMes, setPWValMes] = useState('Please enter your password');
  const onEmailChange = text => {
    setEmail(text);
    setValidateEmail(false);
  };
  const onPasswordChange = text => {
    setPassword(text);
    setValidatePW(false);
  };
  console.log(password);
  const login = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/user-not-found') {
            setEmailValMes(
              'We can not find an account with this email address',
            );
            setEmail('');
            setValidateEmail(true);
          }
          if (error.code === 'auth/invalid-email') {
            setEmailValMes('Please enter a valid email address');
            setEmail('');
            setValidateEmail(true);
          }
          if (error.code === 'auth/wrong-password') {
            setPWValMes('The password you have entered is incorrect');
            setPassword('');
            setValidatePW(true);
          } else {
            console.error(error);
          }
        });
    }
    if (!email) {
      setEmailValMes('Please enter a valid email address');
      setValidateEmail(true);
    }
    if (!password) {
      setPWValMes('Please enter your password');
      setValidatePW(true);
    }
  };
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
      <Button title="Log in" onPress={() => login()} />
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
