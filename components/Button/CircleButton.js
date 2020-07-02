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
        props.alt && styles.Button__alt,
        props.alert && styles.red,
      ]}>
      {props.type !== 'done' ? (
        <Icon
          name={props.type ? props.type : 'plus'}
          size={props.iconSize || 30}
          color={props.alt ? colours.primary : colours.white}
        />
      ) : (
        <MatIcon
          name={props.type}
          size={props.iconSize || 30}
          color={props.alt ? colours.primary : colours.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
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
  Button__alt: {
    backgroundColor: colours.white,
  },
  red: {
    backgroundColor: colours.error,
  },
});

export default CircleButton;
