import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default () => {
  const defaultEmailValidation = 'Please enter a valid email address';
  const defaultPasswordValidation = 'Please create a password';
  const defaultConfrimPasswordValidation = 'Please re-enter your password';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPW, setconfPW] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [emailValMes, setEmailValMes] = useState(defaultEmailValidation);
  const [validatePW, setValidatePW] = useState(false);
  const [pwValMes, setPWValMes] = useState(defaultPasswordValidation);
  const [validateConfPW, setValidateConfPW] = useState(false);
  const [confPWValMes, setConfPWValMes] = useState(
    defaultConfrimPasswordValidation,
  );

  const navigation = useNavigation();

  const onEmailChange = text => {
    setEmail(text);
    setValidateEmail(false);
  };
  const onPasswordChange = text => {
    setPassword(text);
    setValidatePW(false);
  };
  const onConfPWChange = text => {
    setconfPW(text);
    setValidateConfPW(false);
  };
  const onCreate = () => {
    if (email && password && password === confPW) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('My Lists');
        })
        .catch(error => {
          console.log(error.code);
          if (error.code === 'auth/email-already-in-use') {
            setEmailValMes('That email address is already in use.');
            setEmail('');
            setValidateEmail(true);
          }
          if (error.code === 'auth/invalid-email') {
            setEmailValMes('Please enter a valid email address');
            setEmail('');
            setValidateEmail(true);
          }
          if (error.code === 'auth/weak-password') {
            setPWValMes('Password should be at least 6 characters long');
            setPassword('');
            setValidatePW(true);
            setValidateConfPW('Password should be at least 6 characters long');
            setconfPW('');
            setValidateConfPW(true);
          } else {
            console.error(error);
          }
        });
    }
    if (!email) {
      setEmailValMes(defaultEmailValidation);
      setValidateEmail(true);
    }
    if (!password) {
      setPWValMes(defaultPasswordValidation);
      setValidatePW(true);
    }
    if (!confPW) {
      setConfPWValMes(defaultConfrimPasswordValidation);
      setValidateConfPW(true);
    }
    if (password !== confPW) {
      setConfPWValMes('These passwords do not match');
      setValidateConfPW(true);
    }
  };
  return {
    email,
    password,
    confPW,
    validateEmail,
    emailValMes,
    validatePW,
    pwValMes,
    validateConfPW,
    confPWValMes,
    onEmailChange,
    onPasswordChange,
    onConfPWChange,
    onCreate,
  };
};
