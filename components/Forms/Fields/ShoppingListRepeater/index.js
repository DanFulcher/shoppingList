import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Label from '../Label';
import Input from '../Input';
import NumberInput from '../NumberInput';
import Dropdown from '../Dropdown';
import Button from '../../../Button';

const ShoppingListRepeater = props => {
  const [repeaterFields, setRepeaterFields] = useState([]);

  const fields = [
    {
      type: 'text',
      placeholder: 'Item Name',
    },
    {
      type: 'number',
      placeholder: 'Quantity',
    },
    {
      type: 'dropdown',
      placeholder: 'Category',
    },
  ];
  return (
    <View style={styles.repeater}>
      <Label text={props.title} />
      {repeaterFields.map((singleRow, index) => (
        <View key={index} style={styles.repeater__row}>
          {singleRow.map((field, i) =>
            field.type === 'text' ? (
              <View key={i} style={styles.repeater__row__itemName}>
                <Input placeholder={field.placeholder} />
              </View>
            ) : field.type === 'number' ? (
              <View key={i} style={styles.repeater__row__itemQuant}>
                <NumberInput placeholder={field.placeholder} />
              </View>
            ) : (
              <View key={i} style={styles.repeater__row__itemCat}>
                <Dropdown placeholder={field.placeholder} />
              </View>
            ),
          )}
        </View>
      ))}
      <Button
        title="Add Item"
        onPress={() => setRepeaterFields([...repeaterFields, fields])}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShoppingListRepeater;
