import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import {colours} from '../../../styles';

const List = props => {
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
          <Text style={styles.listBlock__title}>{props.data.name}</Text>
          <Text style={styles.listBlock__checkCount}>
            {checkCount()}/{props.data.items.length}
          </Text>
        </View>
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
    padding: 10,
    borderRadius: 10,
  },
  listBlock__selected: {
    borderWidth: 5,
    borderColor: colours.primary,
    padding: 5,
  },
  listBlock__header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listBlock__title: {
    fontSize: 18,
    color: colours.white,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listBlock__checkCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.white,
  },
  listBlock__item: {
    color: '#fff',
  },
});

export default List;
