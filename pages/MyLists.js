import React from 'react';
import {View, StyleSheet} from 'react-native';
import useLogin from '../hooks/User/useLogin';
import Lists from '../components/Lists';
import Button from '../components/Button';
import {colours} from '../styles';

const MyLists = props => {
  const {onLogout} = useLogin();
  console.log(props.route.params);
  return (
    <View style={styles.body}>
      <Lists />
      <Button title="Log Out" onPress={() => onLogout()} />
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
