import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {colours} from '../../styles';

const CircleButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.Button}>
      <Icon name={props.type ? props.type : 'plus'} size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 50,
  },
});

export default CircleButton;
