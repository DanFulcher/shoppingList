import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {default as MatIcon} from 'react-native-vector-icons/MaterialIcons';
import {default as ReactModal} from 'react-native-modal';
import {colours} from '../../styles';

const Modal = props => {
  return (
    <ReactModal isVisible={props.showModal}>
      <View style={styles.modalBody}>
        <Icon
          name="cross"
          size={21}
          color={colours.dark}
          onPress={props.toggle}
          style={styles.modal__close}
        />
        {props.modalType === 'Done' && (
          <View style={styles.modalBody__iconContainer}>
            <View style={styles.modal__doneIcon}>
              <MatIcon name="done" size={30} color={colours.lighterBg} />
            </View>
          </View>
        )}
        <View style={styles.modalBody__header}>
          {props.modalTitle && (
            <Text
              style={[
                styles.modalBody__header__title,
                props.modalType === 'Done' && styles.title__done,
              ]}>
              {props.modalTitle}
            </Text>
          )}
        </View>
        <View style={styles.modalBody__body}>
          {props.modalText && (
            <Text
              style={[
                styles.modal__text,
                props.modalType === 'Done' && styles.modal__text__done,
              ]}>
              {props.modalText}
            </Text>
          )}
          {props.modalOptions && (
            <View
              style={[
                styles.modalOptions,
                props.horizontalOptions && styles.modalOptions__horizontal,
              ]}>
              {props.modalOptions.map((option, index) => (
                <TouchableOpacity onPress={option.onPress} key={index}>
                  <Text
                    style={[
                      styles.modal__option,
                      option.error && styles.modal__option__error,
                    ]}>
                    {option.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </ReactModal>
  );
};
const styles = StyleSheet.create({
  modalBody: {
    borderColor: colours.background,
    borderWidth: 1,
    padding: 30,
    width: '95%',
    backgroundColor: colours.lighterBg,
    position: 'relative',
  },
  modal__close: {
    position: 'absolute',
    top: 15,
    right: 15,
    elevation: 10,
  },
  modalBody__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBody__header__title: {
    textAlign: 'center',
    width: '100%',
    color: colours.dark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalBody__iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  modal__doneIcon: {
    width: 50,
    height: 50,
    backgroundColor: colours.primary,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal__text: {
    color: colours.dark,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalOptions__horizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modal__option: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    color: colours.dark,
    borderBottomColor: colours.lessDark,
  },
  modal__option__error: {
    color: colours.error,
  },
});
export default Modal;
