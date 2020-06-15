import React from 'react';

import {Text, StyleSheet} from 'react-native';
import {colours} from '../../../../styles';

const Label = props => {
  return <Text style={styles.label}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: colours.dark,
  },
});

export default Label;
