import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useUser from '../hooks/User/useUser';
import UserInfo from '../components/UserInfo';
import Button from '../components/Button';

import {colours} from '../styles';

const Profile = () => {
  const {user, getMe} = useUser();
  useFocusEffect(
    useCallback(() => {
      getMe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const navigation = useNavigation();
  return (
    <View style={styles.body}>
      <UserInfo user={user} />
      <Button
        title="Edit User"
        onPress={() => navigation.navigate('Edit User', {user: user})}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
});
export default Profile;
