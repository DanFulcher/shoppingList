import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default () => {
  const defaultNameValidation = 'Please enter your name';
  const [name, setName] = useState('');
  const [validateName, setValidateName] = useState(false);
  const [nameValMes, setNameValMes] = useState(defaultNameValidation);

  const defaultEmailValidation = 'Please enter a valid email address';
  const [email, setEmail] = useState('');
  const [validateEmail, setValidateEmail] = useState(false);
  const [emailValMes, setEmailValMes] = useState(defaultEmailValidation);

  const defaultPasswordValidation = 'Please create a password';
  const [password, setPassword] = useState('');
  const [validatePW, setValidatePW] = useState(false);
  const [pwValMes, setPWValMes] = useState(defaultPasswordValidation);

  const defaultConfrimPasswordValidation = 'Please re-enter your password';
  const [confPW, setconfPW] = useState('');
  const [validateConfPW, setValidateConfPW] = useState(false);
  const [confPWValMes, setConfPWValMes] = useState(
    defaultConfrimPasswordValidation,
  );

  const navigation = useNavigation();

  const onNameChange = text => {
    setName(text);
    setValidateName(false);
  };
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
    if (name && email && password && password === confPW) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/users/${
              res.user.uid
            }.json`,
            {
              method: 'PUT',
              body: JSON.stringify({
                name: name,
                email: email,
                lists: [],
              }),
            },
          ).then(navigation.navigate('My Lists', {user: res.user.uid}));
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
          }
        });
    }
    if (!name) {
      setNameValMes(defaultNameValidation);
      setValidateName(true);
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
    name,
    validateName,
    nameValMes,
    onNameChange,
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
