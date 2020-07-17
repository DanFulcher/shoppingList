import React, {useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useNotifications from '../hooks/Notifications/useNotifications';

import Notification from '../components/Notification';
import NoItems from '../components/NoItems';
import Modal from '../components/Modal';

import {colours} from '../styles';

const Notifications = () => {
  const {
    getNotifications,
    notifications,
    onAccept,
    onReject,
    showModal,
    setShowModal,
  } = useNotifications();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      getNotifications();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <ScrollView>
      {notifications && Object.keys(notifications).length ? (
        <>
          <View style={styles.notificationContainer}>
            {Object.keys(notifications).map(function(key, index) {
              const notification = notifications[key];
              return (
                <Notification
                  key={key}
                  id={key}
                  message={notification.message}
                  read={notification.read}
                  onAccept={() => onAccept(key, notification.lists)}
                  onReject={() => onReject(key)}
                />
              );
            })}
          </View>
          <Text style={styles.notificationInstructions}>
            It looks like someone has shared their shopping list with you. Press
            the tick icon to accept and download the list, or reject it by
            pressing the cross.
          </Text>
        </>
      ) : (
        <View style={styles.body}>
          <NoItems
            title="No Notifications"
            text="This is where you will see lists that have been shared with you"
          />
        </View>
      )}
      <Modal
        showModal={showModal}
        toggle={() => setShowModal(!showModal)}
        modalTitle="List downloaded">
        <>
          <Text style={styles.modal__text}>
            List has been added to your lists.
          </Text>
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
                Go to My Lists
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15, 
  },
  notificationContainer: {
    marginBottom: 15,
  },
  notificationInstructions: {
    textAlign: 'center',
    paddingHorizontal: 15,
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
export default Notifications;
