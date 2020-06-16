import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {default as ReactModal} from 'react-native-modal';
import {colours} from '../../styles';

const Modal = props => {
  return (
    <ReactModal isVisible={props.showModal}>
      <View style={styles.modalBody}>
        <View style={styles.modalBody__header}>
          {props.modalTitle && (
            <Text style={styles.modalBody__header__title}>
              {props.modalTitle}
            </Text>
          )}
          <Icon
            name="cross"
            size={21}
            color={colours.dark}
            onPress={props.toggle}
          />
        </View>
        {props.children}
      </View>
    </ReactModal>
  );
};
const styles = StyleSheet.create({
  modalBody: {
    borderColor: colours.background,
    borderWidth: 1,
    padding: 15,
    width: '95%',
    backgroundColor: colours.lighterBg,
  },
  modalBody__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalBody__header__title: {
    color: colours.dark,
    fontSize: 21,
  },
});
export default Modal;
