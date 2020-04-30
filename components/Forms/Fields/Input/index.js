import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Label from '../Label';
import Error from '../Error';
import {colours} from '../../../../styles';

const Input = props => {
  const [border, setBorder] = useState(colours.white);

  const onFocus = () => {
    setBorder(colours.primary);
  };
  const onBlur = () => {
    setBorder(colours.white);
  };
  return (
    <>
      {props.label && <Label text={props.label} />}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={colours.white}
        style={[
          styles.input,
          props.error ? {borderColor: colours.error} : {borderColor: border},
        ]}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onChangeText={text => props.onChange(text)}
      />
      {props.error && <Error text={props.errorMessage} />}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: colours.white,
    marginBottom: 20,
  },
});

export default Input;