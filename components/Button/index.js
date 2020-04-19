import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colours} from '../../styles';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.button__text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 10,
  },
  button__text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default Button;
