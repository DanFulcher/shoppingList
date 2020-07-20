import React, {useState} from 'react';

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Modal from '../../Modal';
import useUpdate from '../../../hooks/Items/useUpdate';
import useDelete from '../../../hooks/Items/useDelete';
import {colours} from '../../../styles';
import Icon from 'react-native-vector-icons/Entypo';

const Item = props => {
  const [checked, setChecked] = useState(props.data.checked);
  const [showModal, setShowModal] = useState(false);
  const {checkItem} = useUpdate();
  const {deleteItem} = useDelete();
  const navigation = useNavigation();
  // console.log(props);
  const onCheck = () => {
    checkItem(props.listID, props.itemID, checked);
    setChecked(!checked);
    props.updateChecked(!checked);
  };
  const handleEdit = () => {
    setShowModal(false);
    navigation.navigate('Edit Item', {
      list: props.listID,
      item: props.itemID,
      data: props.data,
    });
  };
  const handleDel = () => {
    deleteItem(props.listID, props.itemID);
    setShowModal(false);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => onCheck()}
        onLongPress={props.drag}
        delayLongPress={200}>
        <View style={styles.item}>
          <View style={styles.item__info}>
            <CheckBox
              value={checked}
              onValueChange={() => onCheck()}
              tintColors={
                props.data.flag && props.data.flag.flagged
                  ? {true: colours.lessDark, false: colours.lessDark}
                  : {true: colours.primary, false: colours.primary}
              }
              size={30}
              disabled={props.data.flag && props.data.flag.flagged}
            />
            <Text
              style={[
                styles.item__text,
                checked && styles.item__text__linethrough,
              ]}>
              {props.data.name}
              {props.data.quantity > 1 && ` x ${props.data.quantity}`}
            </Text>
          </View>

          <View style={styles.item__actions}>
            {!checked && (
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Icon
                  style={styles.item__actions__item}
                  name="dots-three-vertical"
                  size={18}
                  color={colours.lessDark}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle="Item Options"
        modalOptions={[
          {
            text: 'Edit Item',
            onPress: () => handleEdit(),
          },
          {
            text: 'Remove Item from List',
            onPress: () => handleDel(),
            error: true,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colours.background,
    paddingVertical: 15,
  },
  item__info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item__text: {
    fontSize: 14,
    color: colours.dark,
  },
  item__text__linethrough: {
    textDecorationLine: 'line-through',
    color: colours.primary,
  },
  item__actions: {
    display: 'flex',
    flexDirection: 'row',
  },
  item__actions__item: {
    marginLeft: 10,
  },
  modal__option: {
    fontSize: 14,
    color: colours.dark,
    marginBottom: 10,
  },
  modal__text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Item;
