import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import useLists from '../hooks/Lists/useLists';
import {colours} from '../styles';
import {useNavigation} from '@react-navigation/native';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const navigation = useNavigation();
  const {getList, userLists} = useLists();
  const {list} = props.route.params;

  console.log(userLists);

  useEffect(() => {
    getList(list.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <View style={styles.body}>
        {userLists &&
          userLists.map((list, index) => (
            <SingleList key={index} list={list} />
          ))}
        <CircleButton
          onPress={() => navigation.navigate('Add Item', {list: list})}
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
