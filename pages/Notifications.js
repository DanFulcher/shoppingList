import React, {useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useNotifications from '../hooks/Notifications/useNotifications';

import Notification from '../components/Notification';
import NoItems from '../components/NoItems';

const Notifications = () => {
  const {getNotifications, notifications} = useNotifications();
  useFocusEffect(
    useCallback(() => {
      getNotifications();
      console.log(notifications);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <ScrollView>
      {notifications ? (
        <>
          <View style={styles.notificationContainer}>
            {Object.keys(notifications).map(function(key, index) {
              const notification = notifications[key];
              return (
                <Notification
                  key={notification}
                  id={notification}
                  message={notification.message}
                  read={notification.read}
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
        <NoItems
          title="No Notifications"
          text="This is where you will see lists that have been shared with you"
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  notificationContainer: {
    marginBottom: 15,
  },
  notificationInstructions: {
    textAlign: 'center',
    paddingHorizontal: 15,
  },
});
export default Notifications;
