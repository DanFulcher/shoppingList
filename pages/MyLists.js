import React from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Lists from '../components/Lists';
import Button from '../components/Button';
import {colours} from '../styles';

const MyLists = props => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={styles.body}>
      <Lists />
      <Button title="Log Out" onPress={() => logout()} />
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

export default MyLists;
