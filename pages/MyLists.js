import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, RefreshControl, View, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import useLists from '../hooks/Lists/useLists';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import Lists from '../components/Lists';
import Loading from '../components/Loading';
import {colours} from '../styles';
import Button from '../components/Button';
import CircleButton from '../components/Button/CircleButton';
const MyLists = props => {
  const navigation = useNavigation();

  const [lists, setLists] = useState([]);
  const {userLists, getLocalLists, onRefresh, refreshing, loading} = useLists();

  useFocusEffect(
    useCallback(() => {
      getLocalLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  useEffect(() => {
    setLists(userLists);
  }, [userLists]);
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
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
