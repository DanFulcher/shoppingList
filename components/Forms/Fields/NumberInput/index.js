import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
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
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: colours.dark,
    marginBottom: 20,
  },
});

export default Input;
