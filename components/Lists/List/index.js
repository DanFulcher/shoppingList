import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';

import moment from 'moment';

import useLists from '../../../hooks/Lists/useLists';
import useUser from '../../../hooks/User/useUser';
import {colours} from '../../../styles';

const List = props => {
  const {getUser, user, currentUserID} = useUser();
  const {checkCount} = useLists();
  useEffect(() => {
    props.data.author && getUser(props.data.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const completed = checkCount(props.data.items) === props.data.items.length;
  const author =
    !props.data.author || props.data.author === currentUserID
      ? 'You'
      : user.name;
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
  const created_at = moment(props.data.created_at).fromNow();
  const updated = moment(props.data.updated_at).fromNow();
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
              completed &&
                props.data.items.length > 0 &&
                styles.listBlock__checkCount__completed,
              selected && styles.listBlock__text__selected,
            ]}>
            {checkCount(props.data.items)}/{props.data.items.length}
          </Text>
        </View>
        <Text style={styles.listBlock__meta}>By {author}</Text>
        <Text style={styles.listBlock__meta}>
          Created {created_at} {props.data.updated_at && `(Updated ${updated})`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listBlock: {
    flexBasis: '100%',
    width: '100%',
    backgroundColor: colours.lighterBg,
    borderBottomWidth: 1,
    borderBottomColor: colours.background,
    padding: 20,
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
  listBlock__meta: {
    fontSize: 11,
    color: colours.lessDark,
  },
  listBlock__checkCount: {
    fontSize: 18,
    color: colours.dark,
  },
  listBlock__checkCount__completed: {
    color: colours.primary,
    fontWeight: '700',
  },
  listBlock__text__selected: {
    color: colours.white,
  },
  listBlock__item: {
    color: colours.dark,
  },
});

export default List;
