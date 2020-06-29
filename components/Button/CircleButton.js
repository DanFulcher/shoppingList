import React from 'react';

import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {default as MatIcon} from 'react-native-vector-icons/MaterialIcons';
import {colours} from '../../styles';

const CircleButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.Button,
        props.position === 'bottomLeft'
          ? styles.Button__left
          : styles.Button__right,
        props.alert && styles.red,
      ]}>
      {props.type !== 'done' ? (
        <Icon
          name={props.type ? props.type : 'plus'}
          size={props.iconSize || 30}
          color={colours.white}
        />
      ) : (
        <MatIcon
          name={props.type}
          size={props.iconSize || 30}
          color={colours.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 50,
    minWidth: 65,
    minHeight: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button__right: {
    right: 20,
  },
  Button__left: {
    left: 20,
  },
  red: {
    backgroundColor: colours.error,
  },
});

export default CircleButton;
