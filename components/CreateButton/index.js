import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colours} from '../../styles';
const CreateButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.createButton}>
        <Text style={styles.createButton__icon}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: colours.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  createButton__icon: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default CreateButton;
