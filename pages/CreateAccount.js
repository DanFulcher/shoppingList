import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useCreate from '../hooks/User/useCreate';
import {colours} from '../styles';
import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const CreateAccount = props => {
  const {
    name,
    validateName,
    nameValMes,
    onNameChange,
    email,
    validateEmail,
    emailValMes,
    onEmailChange,
    password,
    validatePW,
    pwValMes,
    onPasswordChange,
    confPW,
    validateConfPW,
    confPWValMes,
    onConfPWChange,
    onCreate,
  } = useCreate();
  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.createAccountForm}>
          <Input
            label="Full Name"
            error={validateName}
            errorMessage={nameValMes}
            onChange={text => onNameChange(text)}
            value={name}
            placeholder="The name used to share lists with you"
          />
          <Input
            label="Email Address"
            error={validateEmail}
            errorMessage={emailValMes}
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
          <Input
            label="Confirm Password"
            error={validateConfPW}
            errorMessage={confPWValMes}
            onChange={text => onConfPWChange(text)}
            value={confPW}
            password
          />
          <Button title="Create Account" onPress={() => onCreate()} />
        </View>
      </ScrollView>
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

export default CreateAccount;
