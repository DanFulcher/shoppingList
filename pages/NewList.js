import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colours} from '../styles';

import Input from '../components/Forms/Fields/Input';
import ShoppingListRepeater from '../components/Forms/Fields/ShoppingListRepeater';

const NewList = props => {
  return (
    <View style={styles.body}>
      <Input label="List Name" placeholder="eg. My List" />
      <ShoppingListRepeater title="List" />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colours.background,
    padding: 20,
  },
});

export default NewList;
