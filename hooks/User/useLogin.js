import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default () => {
  const defaultEmailValidation = 'Please enter a valid email address';
  const defaultPasswordValidation = 'Please enter your password';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [emailValMes, setEmailValMes] = useState(defaultEmailValidation);
  const [validatePW, setValidatePW] = useState(false);
  const [pwValMes, setPWValMes] = useState(defaultPasswordValidation);

  const navigation = useNavigation();

  const onEmailChange = text => {
    setEmail(text);
    setValidateEmail(false);
  };
  const onPasswordChange = text => {
    setPassword(text);
    setValidatePW(false);
  };
  const onLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('My Lists');
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
      setEmailValMes(defaultEmailValidation);
      setValidateEmail(true);
    }
    if (!password) {
      setPWValMes(defaultPasswordValidation);
      setValidatePW(true);
    }
  };
  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };
  return {
    email,
    password,
    validateEmail,
    emailValMes,
    validatePW,
    pwValMes,
    onEmailChange,
    onPasswordChange,
    onLogin,
    onLogout,
  };
};