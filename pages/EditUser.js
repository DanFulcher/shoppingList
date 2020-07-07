import React from 'react';
import {View, StyleSheet} from 'react-native';
import useUpdate from '../hooks/User/useUpdate';
import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

import {colours} from '../styles';

const EditUser = props => {
  const {
    updateUser,
    userName,
    userEmail,
    onNameChange,
    onEmailChange,
  } = useUpdate(props.route.params.user.name, props.route.params.user.email);
  return (
    <View style={styles.body}>
      <Input
        label="Name"
        value={userName}
        onChange={text => onNameChange(text)}
      />
      <Input
        label="Email Address"
        value={userEmail}
        onChange={text => onEmailChange(text)}
      />
      <Button title="Update Info" onPress={() => updateUser()} />
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
export default EditUser;
