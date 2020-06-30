import React, {useState} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Modal from '../../Modal';
import useUpdate from '../../../hooks/Items/useUpdate';
import useDelete from '../../../hooks/Items/useDelete';
import {colours} from '../../../styles';

const Item = props => {
  const [checked, setChecked] = useState(props.data.checked);
  const [showOptions, setShowOptions] = useState(false);
  const {checkItem} = useUpdate();
  const {deleteItem} = useDelete();
  const navigation = useNavigation();
  const onCheck = () => {
    checkItem(props.listID, props.itemID, checked);
    setChecked(!checked);
  };
  const handleDel = () => {
    deleteItem(props.listID, props.itemID);
    setShowOptions(!showOptions);
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
        }
        onLongPress={() => {
          setShowOptions(true);
        }}>
        <Text
          style={[
            styles.item__text,
            checked && styles.item__text__linethrough,
          ]}>
          {props.data.name}
          {props.data.quantity > 1 && ` x ${props.data.quantity}`}
        </Text>
      </TouchableOpacity>

      <Modal
        showModal={showOptions}
        toggle={() => setShowOptions(!showOptions)}
        modalTitle="Item Options">
        {/* <Text style={styles.modal__option}>Edit item</Text>
        <Text style={styles.modal__option}>I can't find this item</Text>
        <Text style={styles.modal__option}>This item is out of stock</Text> */}
        <TouchableOpacity onPress={() => handleDel()}>
          <Text style={styles.modal__option}>Remove item from list</Text>
        </TouchableOpacity>
      </Modal>
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
  modal__option: {
    fontSize: 16,
    color: colours.dark,
    marginBottom: 10,
  },
});

export default Item;
