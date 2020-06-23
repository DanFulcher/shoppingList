import React, {useState, useCallback} from 'react';
import {ScrollView, RefreshControl, View, StyleSheet} from 'react-native';

import useLists from '../hooks/Lists/useLists';
import {useFocusEffect} from '@react-navigation/native';

import Lists from '../components/Lists';
import {colours} from '../styles';

const MyLists = props => {
  const [refreshing, setRefreshing] = useState(false);
  const {userLists, getUsersLists} = useLists();

  useFocusEffect(
    useCallback(() => {
      getUsersLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.scrollView}>
      <View style={styles.body}>
        {userLists && <Lists lists={userLists} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default MyLists;
