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
import NoItems from '../NoItems';

import useDelete from '../../hooks/Lists/useDelete';

import {colours} from '../../styles';

const SingleList = props => {
  const [showOptions, setShowOptions] = useState(false);
  const {deleteLists} = useDelete();
  return (
    <View
      style={[
        styles.listBody,
        props.noOfLists > 1 && styles.listBody__multiView,
      ]}>
      <View style={styles.listBody__header}>
        <Text style={styles.listBody__title}>{props.list.name}</Text>
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Icon name="dots-three-vertical" color={colours.dark} size={18} />
        </TouchableOpacity>
        <Modal
          showModal={showOptions}
          toggle={() => setShowOptions(!showOptions)}
          modalTitle="List Options">
          <TouchableWithoutFeedback onPress={() => deleteLists([props.list])}>
            <Text style={[styles.modal__option, {color: colours.error}]}>
              Delete List
            </Text>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {!props.list.items || !props.list.items.length ? (
        <NoItems
          title="List empty"
          text="This list is currently empty"
          text2="Press the '+' icon to start adding items"
        />
      ) : (
        props.list.items.map((item, index) => (
          <Item key={index} data={item} listID={props.list.id} itemID={index} />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listBody: {
    padding: 15,
    backgroundColor: colours.lighterBg,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listBody__multiView: {
    width: 300,
    marginRight: 10,
  },
  listBody__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colours.lessDark,
    marginBottom: 10,
  },
  modal__option: {
    fontSize: 16,
    color: colours.dark,
    marginBottom: 10,
  },
  listBody__title: {
    fontSize: 21,
    color: colours.dark,
    marginBottom: 10,
  },
});
export default SingleList;
