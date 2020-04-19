import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';

const MyLists = props => {
  const createList = () => {
    console.log('Add list');
  };
  return (
    <View style={styles.container}>
      <Header title="My Lists" />
      <View style={styles.body}>
        <Button onPress={() => createList()} title="Create New List" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
});

export default MyLists;
