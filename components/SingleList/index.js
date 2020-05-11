import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import useLists from '../../hooks/Lists/useLists';
import {colours} from '../../styles';

const SingleList = props => {
  const {getList, userList} = useLists();
  useFocusEffect(
    useCallback(() => {
      getList(props.list.id);
    }, [getList, props.list.id]),
  );
  console.log(userList);
  return (
    <View style={styles.listBody}>
      {userList.items &&
        userList.items.map((item, index) => (
          <Text key={index} style={styles.listBody__item}>
            {item.name}
            {item.quantity > 1 && ` x ${item.quantity}`}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listBody: {
    padding: 15,
    backgroundColor: colours.lighterBg,
    borderRadius: 10,
  },
  listBody__item: {
    fontSize: 18,
    color: colours.white,
  },
});
export default SingleList;
