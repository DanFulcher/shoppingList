import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colours} from '../../styles';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.header__title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colours.background,
    display: 'flex',
    padding: 20,
    borderBottomColor: colours.primary,
    borderBottomWidth: 1,
  },
  header__title: {
    color: '#fff',
    fontSize: 21,
  },
});
export default Header;
