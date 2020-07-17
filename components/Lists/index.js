import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import useLists from '../../hooks/Lists/useLists';
import useDelete from '../../hooks/Lists/useDelete';
import {useNavigation} from '@react-navigation/native';

import CircleButton from '../Button/CircleButton';
import List from './List';
import {colours} from '../../styles';
import Modal from '../Modal';
import NoItems from '../NoItems';
import MultiSelOptions from '../MultiSelOptions';

const Lists = props => {
  const [showModal, setShowModal] = useState(false);
  const {
    multiSelMode,
    onOpen,
    openMulti,
    onSelectMulti,
    onDeselect,
    clearSel,
    selectedLists,
  } = useLists();

  const {deleteLists} = useDelete();
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {props.lists.length ? (
          props.lists.map((list, index) => (
            <List
              key={index}
              data={list}
              multiSelMode={multiSelMode}
              onOpen={() => onOpen(list, index)}
              onSelectMulti={() => onSelectMulti(list)}
              onDeselect={() => onDeselect(list.id)}
              selectedLists={selectedLists}
            />
          ))
        ) : (
          <NoItems
            title="No lists"
            text="You currently have no lists."
            text2="Press the button below to create your first list."
          />
        )}
      </ScrollView>
      {multiSelMode ? (
        <>
          <MultiSelOptions
            clearSel={() => clearSel()}
            delLists={() => setShowModal(!showModal)}
          />
          <CircleButton
            type="chevron-right"
            onPress={() => openMulti(selectedLists)}
          />
        </>
      ) : (
        <CircleButton
          type="new-message"
          iconSize={28}
          onPress={() =>
            navigation.navigate('New List', {numberOfLists: props.lists.length})
          }
        />
      )}

      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle="Delete List(s)">
        <Text style={styles.modal__text}>
          Are you sure you want to delete{' '}
          {selectedLists.length > 1 ? 'these lists' : 'this list'}? This action
          cannot be undone.
        </Text>
        <View style={styles.modalActions}>
          <TouchableWithoutFeedback
            onPress={() => {
              deleteLists(selectedLists);
              setShowModal(!showModal);
            }}>
            <Text
              style={[styles.modalActions__text, styles.modalActions__warning]}>
              Yes
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)}>
            <Text style={styles.modalActions__text}>No</Text>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal__text: {
    color: colours.dark,
    marginBottom: 20,
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalActions__text: {
    color: colours.dark,
    fontSize: 18,
    marginLeft: 20,
  },
  modalActions__warning: {
    color: colours.error,
  },
  noLists: {
    marginTop: 10,
  },
  noLists__text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Lists;
