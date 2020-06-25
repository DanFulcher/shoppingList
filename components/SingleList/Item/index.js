import React, {useState} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import useUpdate from '../../../hooks/Items/useUpdate';
import {colours} from '../../../styles';

const Item = props => {
  const [checked, setChecked] = useState(props.data.checked);
  const {checkItem} = useUpdate();
  const navigation = useNavigation();
  const onCheck = () => {
    checkItem(props.listID, props.itemID, checked);
    setChecked(!checked);
  };
  return (
    <View style={styles.item}>
      <CheckBox
        value={checked}
        onValueChange={() => onCheck()}
        tintColors={{true: colours.primary, false: colours.primary}}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit Item', {
            list: props.listID,
            item: props.itemID,
            data: props.data,
          })
        }>
        <Text
          style={[
            styles.item__text,
            checked && styles.item__text__linethrough,
          ]}>
          {props.data.name}
          {props.data.quantity > 1 && ` x ${props.data.quantity}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item__text: {
    fontSize: 16,
    color: colours.dark,
  },
  item__text__linethrough: {
    textDecorationLine: 'line-through',
    color: colours.primary,
  },
});

export default Item;
