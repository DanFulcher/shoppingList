import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {default as MatIcon} from 'react-native-vector-icons/MaterialIcons';
import {default as EntIcon} from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import {colours} from '../../styles';

const Notification = props => {
  const created_at = moment(props.created_at).fromNow();
  return (
    <View style={styles.notification}>
      <View style={styles.notification__textContainer}>
        {!props.read && <View style={styles.notification__unread} />}
        <View>
          <Text
            style={[
              styles.notification__text,
              !props.read && styles.notification__text__unread,
            ]}>
            {props.message}
          </Text>
          {props.created_at && (
            <Text style={styles.notification__meta}>{created_at}</Text>
          )}
        </View>
      </View>
      <View style={styles.notification__actions}>
        <TouchableOpacity onPress={props.onAccept}>
          <View style={styles.notification__actions__action}>
            <MatIcon name="done" size={30} color={colours.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onReject}>
          <View style={styles.notification__actions__action}>
            <EntIcon name="cross" size={20} color={colours.primary} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    backgroundColor: colours.lighterBg,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colours.background,
  },
  notification__textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '60%',
    width: '60%',
  },
  notification__unread: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: colours.primary,
    marginRight: 10,
  },
  notification__text: {
    color: colours.dark,
  },
  notification__text__unread: {
    fontWeight: 'bold',
  },
  notification__meta: {
    fontSize: 11,
    color: colours.lessDark,
  },
  notification__actions: {
    flexBasis: '40%',
    width: '40%',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  notification__actions__action: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colours.primary,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default Notification;
