import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';

import useUser from '../../../hooks/User/useUser';
import {colours} from '../../../styles';

const List = props => {
  const {getUser, user, currentUserID} = useUser();
  useEffect(() => {
    getUser(props.data.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const author = props.data.author === currentUserID ? 'You' : user.name;
  const checkCount = () => {
    let count = 0;
    for (let i = 0; i < props.data.items.length; ++i) {
      if (props.data.items[i].checked === true) {
        count++;
      }
    }
    return count;
  };

  const selected = props.selectedLists.find(
    element => element.id === props.data.id,
  );
  const select = () => {
    props.onSelectMulti();
    Vibration.vibrate(50);
  };
  const deselect = () => {
    props.onDeselect();
    Vibration.vibrate(50);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        !props.multiSelMode
          ? props.onOpen()
          : props.multiSelMode && !selected
          ? select()
          : deselect()
      }
      onLongPress={() => (!selected ? select() : deselect())}>
      <View style={[styles.listBlock, selected && styles.listBlock__selected]}>
        <View style={styles.listBlock__header}>
          <Text
            style={[
              styles.listBlock__title,
              selected && styles.listBlock__text__selected,
            ]}>
            {props.data.name}
          </Text>
          <Text
            style={[
              styles.listBlock__checkCount,
              selected && styles.listBlock__text__selected,
            ]}>
            {checkCount()}/{props.data.items.length}
          </Text>
        </View>
        <Text style={styles.listBlock__author}>Created By: {author}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listBlock: {
    flexBasis: '100%',
    width: '100%',
    backgroundColor: colours.lighterBg,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listBlock__selected: {
    backgroundColor: colours.primary,
  },
  listBlock__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listBlock__title: {
    fontSize: 18,
    color: colours.dark,
    marginBottom: 5,
  },
  listBlock__author: {
    fontSize: 11,
    color: colours.lessDark,
  },
  listBlock__checkCount: {
    fontSize: 18,
    color: colours.dark,
  },
  listBlock__text__selected: {
    color: colours.white,
  },
  listBlock__item: {
    color: colours.dark,
  },
});

export default List;
