import React from 'react';

import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {colours} from '../../../styles';

const List = props => {
  const onButtonPress = () => {
    alert('Button Tapped');
  };

  const onButtonLongPress = () => {
    alert('Button Held');
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => onButtonPress()}
      onLongPress={() => onButtonLongPress()}>
      <View style={styles.listBlock}>
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
