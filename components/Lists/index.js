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
      {multiSelMode && (
        <View style={styles.multiSelectbar}>
          <Text style={styles.multiSelectbar__text}>
            {selectedLists.length} List{selectedLists.length > 1 && 's'}{' '}
            Selected
          </Text>
          <TouchableWithoutFeedback onPress={() => clearSel()}>
            <Text style={styles.multiSelectbar__clear}>Clear selection</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      <ScrollView style={styles.listContainer}>
        {props.lists.map((list, index) => (
          <List
            key={index}
            data={list}
            multiSelMode={multiSelMode}
            onOpen={() => onOpen(list)}
            onSelectMulti={() => onSelectMulti(list)}
            onDeselect={() => onDeselect(list.id)}
            selectedLists={selectedLists}
          />
        ))}
      </ScrollView>
      {multiSelMode ? (
        <>
          <CircleButton
            type="trash"
            iconSize={20}
            position="bottomLeft"
            alert={true}
            onPress={() => setShowModal(!showModal)}
          />
          <CircleButton
            type="chevron-right"
            onPress={() => openMulti(selectedLists)}
          />
        </>
      ) : (
        <CircleButton
          type="plus"
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
          <TouchableWithoutFeedback onPress={() => deleteLists(selectedLists)}>
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
  multiSelectbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  multiSelectbar__text: {
    color: colours.dark,
    fontSize: 18,
  },
  multiSelectbar__clear: {
    color: colours.primary,
    fontSize: 16,
  },
  noLists: {
    color: colours.dark,
    textAlign: 'center',
    fontSize: 18,
  },
  modal__text: {
    color: colours.dark,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalActions__text: {
    color: colours.dark,
    fontSize: 21,
  },
  modalActions__warning: {
    color: colours.error,
  },
});

export default Lists;
