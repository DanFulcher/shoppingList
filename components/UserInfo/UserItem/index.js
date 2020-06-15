import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colours} from '../../../styles';

const UserItem = props => {
  return (
    <View style={styles.userItem}>
      <Text style={styles.userItem__label}>{props.label}</Text>
      <Text style={styles.userItem__value}>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    marginBottom: 20,
  },
  userItem__label: {
    fontSize: 14,
    color: colours.dark,
  },
  userItem__value: {
    fontSize: 21,
    color: colours.dark,
  },
});
export default UserItem;
