import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colours} from '../../styles';

const NoItems = props => {
  return (
    <View style={styles.noItems}>
      <Text style={styles.noItems__title}>{props.title}</Text>
      <Text style={styles.noItems__text}>{props.text}</Text>
      {props.text2 && <Text style={styles.noItems__text}>{props.text2}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  noItems: {
    marginTop: 10,
    marginBottom: 20,
  },
  noItems__title: {
    color: colours.lessDark,
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
  },
  noItems__text: {
    color: colours.lessDark,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NoItems;
