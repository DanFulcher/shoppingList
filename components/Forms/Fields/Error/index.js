import React from 'react';

import {Text, StyleSheet} from 'react-native';
import {colours} from '../../../../styles';

const Error = props => {
  return <Text style={styles.error}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  error: {
    left: 0,
    fontSize: 14,
    color: colours.error,
    marginBottom: 20,
  },
});
export default Error;
