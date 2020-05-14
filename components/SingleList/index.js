import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Item from './Item';

import {colours} from '../../styles';

const SingleList = props => {
  return (
    <View style={styles.listBody}>
      <Text style={styles.listBody__title}>{props.list.name}</Text>
      {props.list.items &&
        props.list.items.map((item, index) => (
          <Item key={index} data={item} listID={props.list.id} itemID={index} />
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
});
export default SingleList;
