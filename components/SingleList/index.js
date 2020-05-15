import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Item from './Item';
import Modal from 'react-native-modal';

import {colours} from '../../styles';

const SingleList = props => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <View style={styles.listBody}>
      <View style={styles.listBody__header}>
        <Text style={styles.listBody__title}>{props.list.name}</Text>
        <TouchableOpacity onPress={() => toggleOptions()}>
          <Icon name="dots-three-vertical" color="#fff" size={18} />
        </TouchableOpacity>
        <Modal
          isVisible={showOptions}
          onBackButtonPress={() => setShowOptions(!showOptions)}
          hideModalContentWhileAnimating={true}
          onSwipeComplete={() => setShowOptions(!showOptions)}
          swipeDirection="up">
          <View style={styles.listBody__options}>
            <View style={styles.listBody__options__header}>
              <Text style={styles.listBody__options__title}>List Options</Text>
              <Icon
                name="cross"
                size={21}
                color="#fff"
                onPress={() => setShowOptions(false)}
              />
            </View>
            <Text style={styles.listBody__options__option}>Rename List</Text>
            <Text
              style={[
                styles.listBody__options__option,
                {color: colours.error},
              ]}>
              Delete List
            </Text>
          </View>
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
  listBody__options: {
    borderColor: colours.background,
    borderWidth: 1,
    padding: 15,
    width: '95%',
    backgroundColor: colours.lighterBg,
  },
  listBody__options__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  listBody__options__title: {
    color: colours.white,
    fontSize: 21,
  },
  listBody__options__option: {
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
