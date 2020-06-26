import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useShare from '../../hooks/Lists/useShare';
import {colours} from '../../styles';
import Modal from '../Modal';

const FilterResaults = props => {
  const {
    showModal,
    setShowModal,
    shareList,
    selectedUser,
    openShareModal,
    complete,
  } = useShare();

  const navigation = useNavigation();
  return (
    <View style={styles.resultsContainer}>
      {props.results.length ? (
        props.results.map(user => {
          return (
            <TouchableOpacity
              onPress={() => openShareModal(user)}
              key={user.id}>
              <View style={styles.result}>
                <Text style={styles.result__name}>{user.name}</Text>
                <Text style={styles.result__email}>{user.email}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No users found</Text>
      )}
      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle={complete ? 'Success!' : 'Share List(s)'}>
        {complete ? (
          <>
            <Text
              style={
                styles.modal__text
              }>{`You have successfully shared your list with ${
              selectedUser.name
            }`}</Text>
            <View style={styles.modalActions}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowModal(!showModal);
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'My Lists'}],
                  });
                }}>
                <Text style={styles.modalActions__text__small}>
                  Back to My Lists
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.modal__text}>
              {`Are you sure you would like to share ${
                props.lists.length > 1
                  ? `${props.lists.length} lists`
                  : props.lists[0].name
              } with ${selectedUser.name}`}
            </Text>
            <View style={styles.modalActions}>
              <TouchableWithoutFeedback
                onPress={() => {
                  shareList(selectedUser, props.lists);
                }}>
                <Text style={styles.modalActions__text}>Yes</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => setShowModal(!showModal)}>
                <Text style={styles.modalActions__text}>No</Text>
              </TouchableWithoutFeedback>
            </View>
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    backgroundColor: colours.lighterBg,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  result: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colours.lessDark,
  },
  result__name: {
    fontSize: 16,
    marginBottom: 5,
  },
  result__email: {
    fontSize: 12,
  },
  modal__text: {
    color: colours.dark,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalActions__text: {
    color: colours.dark,
    fontSize: 21,
    marginLeft: 40,
  },
  modalActions__text__small: {
    color: colours.dark,
    fontSize: 16,
    marginLeft: 40,
  },
});

export default FilterResaults;
