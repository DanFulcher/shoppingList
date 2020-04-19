import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.header__title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    display: 'flex',
  },
  header__title: {
    color: '#fff',
  },
});
export default Header;
