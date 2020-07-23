import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, RefreshControl, View, StyleSheet} from 'react-native';

import useLists from '../hooks/Lists/useLists';
import {useFocusEffect} from '@react-navigation/native';

import Lists from '../components/Lists';
import Loading from '../components/Loading';
import {colours} from '../styles';
const MyLists = props => {
  const [lists, setLists] = useState([]);
  const {userLists, getLists, onRefresh, refreshing, loading} = useLists();

  useFocusEffect(
    useCallback(() => {
      getLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  useEffect(() => {
    setLists(userLists);
  }, [userLists]);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.scrollView}>
      <View style={styles.body}>
        {loading ? <Loading /> : lists && <Lists lists={lists} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  body: {
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default MyLists;
