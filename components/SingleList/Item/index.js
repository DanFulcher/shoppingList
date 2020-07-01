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
  const [showFlag, setShowFlag] = useState(false);
  const {checkItem, flagItem} = useUpdate();
  const {deleteItem} = useDelete();
  const navigation = useNavigation();
  const onCheck = () => {
    checkItem(props.listID, props.itemID, checked);
    setChecked(!checked);
  };
  const handleEdit = () => {
    setShowModal(!showModal);
    navigation.navigate('Edit Item', {
      list: props.listID,
      item: props.itemID,
      data: props.data,
    });
  };
  const handleFlag = flagType => {
    setShowModal(!showModal);
    flagItem(props.listID, props.itemID, flagType);
  };
  const handleDel = () => {
    deleteItem(props.listID, props.itemID);
    setShowModal(!showModal);
  };
  return (
    <>
      <View style={styles.item}>
        <View style={styles.item__info}>
          <CheckBox
            value={checked}
            onValueChange={() => onCheck()}
            tintColors={
              props.data.flag.flagged
                ? {true: colours.lessDark, false: colours.lessDark}
                : {true: colours.primary, false: colours.primary}
            }
            disabled={props.data.flag.flagged}
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
              setShowModal(true);
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
        </View>

        <View style={styles.item__actions}>
          {props.data.flag && props.data.flag.flagged && (
            <TouchableOpacity onPress={() => setShowFlag(true)}>
              <Icon name="flag" size={16} color={colours.error} />
            </TouchableOpacity>
          )}
          {!checked && (
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Icon
                style={styles.item__actions__item}
                name="dots-three-vertical"
                size={16}
                color={colours.lessDark}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle="Item Options">
        {props.data.flag && props.data.flag.flagged ? (
          <TouchableOpacity onPress={() => handleFlag('remove')}>
            <Text style={styles.modal__option}>Remove Flag</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity onPress={() => handleFlag('location')}>
              <Text style={styles.modal__option}>I can't find this item</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFlag('stock')}>
              <Text style={styles.modal__option}>
                This item is out of stock
              </Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => handleEdit()}>
          <Text style={styles.modal__option}>Edit item</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDel()}>
          <Text style={styles.modal__option}>Remove item from list</Text>
        </TouchableOpacity>
      </Modal>
      <Modal
        showModal={showFlag}
        toggle={() => setShowFlag(!showFlag)}
        modalTitle={props.data.name}>
        <Text style={styles.modal__text}>{props.data.flag.message}</Text>
        <TouchableOpacity onPress={() => handleEdit()}>
          <Text style={styles.modal__option}>Replace item</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDel()}>
          <Text style={styles.modal__option}>Remove item</Text>
        </TouchableOpacity>
      </Modal>
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
    paddingVertical: 5,
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
