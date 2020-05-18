import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Item from './Item';
import Modal from '../Modal';

import useDelete from '../../hooks/Lists/useDelete';

import {colours} from '../../styles';

const SingleList = props => {
  const [showOptions, setShowOptions] = useState(false);
  const {deleteLists} = useDelete();
  return (
    <View style={styles.listBody}>
      <View style={styles.listBody__header}>
        <Text style={styles.listBody__title}>{props.list.name}</Text>
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Icon name="dots-three-vertical" color="#fff" size={18} />
        </TouchableOpacity>
        <Modal
          showModal={showOptions}
          toggle={() => setShowOptions(!showOptions)}
          modalTitle="List Options">
          <Text style={styles.modal__option}>Rename List</Text>
          <TouchableWithoutFeedback onPress={() => deleteLists([props.list])}>
            <Text style={[styles.modal__option, {color: colours.error}]}>
              Delete List
            </Text>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {props.list.items &&
        props.list.items.map((item, index) => (
          <Item key={index} data={item} listID={props.list.id} itemID={index} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listBody: {
    padding: 15,
    backgroundColor: colours.lighterBg,
    borderRadius: 10,
    marginBottom: 20,
  },
  listBody__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal__option: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  listBody__title: {
    fontSize: 21,
    color: colours.white,
    marginBottom: 10,
  },
});
export default SingleList;
