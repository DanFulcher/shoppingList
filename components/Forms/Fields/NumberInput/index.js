import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Label from '../Label';
import {colours} from '../../../../styles';

const Input = props => {
  const [border, setBorder] = useState(colours.dark);

  const onFocus = () => {
    setBorder(colours.primary);
  };
  const onBlur = () => {
    setBorder(colours.primary);
  };
  return (
    <View style={styles.inputContainer}>
      {props.label && <Label text={props.label} />}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={colours.dark}
        keyboardType="numeric"
        style={[styles.input, {borderColor: border}]}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onChangeText={text => props.onChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colours.lighterBg,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    borderBottomWidth: 1,
    color: colours.dark,
  },
});

export default Input;
