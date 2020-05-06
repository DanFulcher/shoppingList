import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import useUpdate from '../hooks/Lists/useUpdate';

import Input from '../components/Forms/Fields/Input';
import NumberInput from '../components/Forms/Fields/NumberInput';
import Button from '../components/Button';

const AddItem = props => {
  const {
    onNameChange,
    validateName,
    onQuantChange,
    validateQuant,
    updateList,
  } = useUpdate();

  return (
    <View style={styles.body}>
      <Input
        label="Item Name"
        error={validateName}
        errorMessage="Give your item a name"
        placeholder="eg. Oat Milk"
        onChange={text => onNameChange(text)}
      />
      <NumberInput
        label="Quantity"
        error={validateQuant}
        errorMessage="How many of this item?"
        onChange={text => onQuantChange(text)}
      />
      <Button
        title="Add Item"
        onPress={() => updateList(props.route.params.list)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colours.background,
    padding: 20,
    height: '100%',
  },
});

export default AddItem;
