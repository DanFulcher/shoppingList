import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import {colours} from '../../../styles';

const List = props => {
  const [selected, setSelected] = useState(false);
  const open = () => {
    alert('Button Tapped');
  };

  const select = () => {
    setSelected(true);
    Vibration.vibrate(50);
  };
  const deselect = () => {
    setSelected(false);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => (!selected ? open() : deselect())}
      onLongPress={() => select()}>
      <View style={[styles.listBlock, selected && styles.listBlock__selected]}>
        <Text style={styles.listBlock__title}>{props.data.name}</Text>
        {props.data.items.map((item, index) => {
          if (index < 3) {
            return (
              <Text style={styles.listBlock__item} key={index}>
                {item.name}
              </Text>
            );
          }
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  listBlock: {
    flexBasis: '48%',
    width: '48%',
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
  listBlock__title: {
    fontSize: 18,
    color: colours.white,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listBlock__item: {
    color: '#fff',
  },
});

export default List;
