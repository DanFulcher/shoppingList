import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import useUpdate from '../hooks/Items/useUpdate';

import Input from '../components/Forms/Fields/Input';
import NumberInput from '../components/Forms/Fields/NumberInput';
import Button from '../components/Button';

const EditItem = props => {
  const {
    onNameChange,
    onQuantChange,
    itemName,
    itemQuant,
    editItem,
    validateName,
    validateQuant,
  } = useUpdate(props.route.params.data.name, props.route.params.data.quantity);
  return (
    <View style={styles.body}>
      <Input
        label="Item Name"
        error={validateName}
        errorMessage="Give your item a name"
        placeholder="eg. Oat Milk"
        onChange={text => onNameChange(text)}
        value={itemName}
      />
      <NumberInput
        label="Quantity"
        error={validateQuant}
        errorMessage="How many of this item?"
        onChange={text => onQuantChange(text)}
        value={itemQuant}
      />
      <Button
        title="Update Item"
        onPress={() =>
          editItem(props.route.params.list, props.route.params.item)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colours.background,
    padding: 15,
    height: '100%',
  },
});

export default EditItem;
