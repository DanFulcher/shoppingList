import React, {useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useNotifications from '../hooks/Notifications/useNotifications';

import Notification from '../components/Notification';
import NoItems from '../components/NoItems';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

import {colours} from '../styles';

const Notifications = () => {
  const {
    getNotifications,
    notifications,
    loading,
    onAccept,
    onReject,
    showModal,
    setShowModal,
  } = useNotifications();
  const navigation = useNavigation();
  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ScrollView>
      {loading ? (
        <View style={styles.body}>
          <Loading />
        </View>
      ) : notifications && Object.keys(notifications).length ? (
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
                  created_at={notification.created_at}
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
        modalType="Done"
        modalTitle="List(s) downloaded"
        modalText="They will know appear in your lists."
        modalOptions={[
          {
            text: 'Go to My Lists',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: 'My Lists'}],
              }),
          },
        ]}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  body: {
    padding: 15,
  },
  notificationContainer: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column-reverse',
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
