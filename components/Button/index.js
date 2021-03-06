import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colours} from '../../styles';

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.button,
          props.small && styles.small,
          props.noFill && styles.noFill,
        ]}>
        <Text
          style={[
            styles.button__text,
            props.noFill && styles.noFill__text,
            props.small && styles.button__text__small,
          ]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 50,
  },
  button__text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  small: {
    width: 150,
    padding: 10,
  },
  noFill: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colours.primary,
  },
  noFill__text: {
    color: colours.primary,
  },
  button__text__small: {
    fontSize: 16,
    textAlign: 'center',
  },
});
export default Button;
