import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {colours} from '../../styles';

const SingleList = props => {
  return (
    <View style={styles.listBody}>
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
  },
  listBody__item: {
    fontSize: 18,
    color: colours.white,
  },
});
export default SingleList;
