import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {colours} from '../../styles';

const SingleList = props => {
  return (
    <View style={styles.listBody}>
      <Text style={styles.listBody__title}>{props.list.name}</Text>
      {props.list.items &&
        props.list.items.map((item, index) => (
          <Text key={index} style={styles.listBody__item}>
            {item.name}
            {item.quantity > 1 && ` x ${item.quantity}`}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listBody: {
    padding: 15,
    backgroundColor: colours.lighterBg,
    borderRadius: 10,
    marginBottom: 20,
  },
  listBody__title: {
    fontSize: 21,
    color: colours.white,
    marginBottom: 10,
  },
  listBody__item: {
    fontSize: 16,
    color: colours.white,
  },
});
export default SingleList;
