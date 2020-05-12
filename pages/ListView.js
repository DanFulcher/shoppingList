import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import useLists from '../hooks/Lists/useLists';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const {list} = props.route.params;
  const navigation = useNavigation();
  const {getList, userList} = useLists();
  useFocusEffect(
    useCallback(() => {
      getList(list.id);
    }, [getList, list]),
  );
  return (
    <View>
      <View style={styles.body}>
        <SingleList list={userList} />
        <CircleButton
          onPress={() => navigation.navigate('Add Item', {list: userList})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default ListView;
