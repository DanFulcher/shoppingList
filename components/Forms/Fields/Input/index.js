import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Label from '../Label';
import Error from '../Error';
import {colours} from '../../../../styles';

const Input = props => {
  const [border, setBorder] = useState(colours.dark);

  const onFocus = () => {
    setBorder(colours.primary);
  };
  const onBlur = () => {
    setBorder(colours.dark);
  };
  return (
    <>
      {props.label && <Label text={props.label} />}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={colours.dark}
        style={[
          styles.input,
          props.error ? {borderColor: colours.error} : {borderColor: border},
        ]}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onChangeText={text => props.onChange(text)}
        value={props.value}
        secureTextEntry={props.password && true}
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
    color: colours.primary,
    marginBottom: 20,
  },
});

export default Input;
