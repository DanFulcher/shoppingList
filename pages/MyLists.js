import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import useLogin from '../hooks/User/useLogin';
import useLists from '../hooks/Lists/useLists';
import {useFocusEffect} from '@react-navigation/native';

import Lists from '../components/Lists';
import Button from '../components/Button';
import {colours} from '../styles';

const MyLists = props => {
  const {onLogout} = useLogin();
  const {userLists, getAllLists} = useLists();

  useFocusEffect(
    useCallback(() => {
      getAllLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <View style={styles.body}>
      <Lists lists={userLists} />
      <Button title="Log Out" onPress={() => onLogout()} />
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

export default MyLists;
