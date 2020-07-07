import React, {useCallback} from 'react';
import {ScrollView, RefreshControl, View, StyleSheet} from 'react-native';

import useLists from '../hooks/Lists/useLists';
import {useFocusEffect} from '@react-navigation/native';

import Lists from '../components/Lists';
import Loading from '../components/Loading';
import {colours} from '../styles';

const MyLists = props => {
  const {
    userLists,
    setUserLists,
    getUsersLists,
    onRefresh,
    refreshing,
    loading,
  } = useLists();

  useFocusEffect(
    useCallback(() => {
      setUserLists([]);
      getUsersLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.scrollView}>
      <View style={styles.body}>
        {loading ? <Loading /> : userLists && <Lists lists={userLists} />}
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
