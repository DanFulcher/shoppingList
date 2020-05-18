import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import Label from '../Label';
import Input from '../Input';
import NumberInput from '../NumberInput';
import Dropdown from '../Dropdown';
import Button from '../../../Button';

const Repeater = props => {
  const [repeaterFields, setRepeaterFields] = useState([]);
  return (
    <View style={styles.repeater}>
      <Label text={props.title} />
      {repeaterFields.map((singleRow, index) => (
        <View key={index} style={styles.repeater__row}>
          {singleRow.map((field, i) =>
            field.type === 'text' ? (
              <Input key={i} placeholder={field.placeholder} />
            ) : field.type === 'number' ? (
              <NumberInput key={i} placeholder={field.placeholder} />
            ) : (
              <Dropdown key={i} placeholder={field.placeholder} />
            ),
          )}
        </View>
      ))}
      <Button
        title="Add Item"
        onPress={() => setRepeaterFields([...repeaterFields, props.fields])}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Repeater;
