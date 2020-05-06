import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colours} from '../styles';

const MyLists = props => {
  return (
    <View>
      <View style={styles.body}>
        <Text>List View</Text>
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

export default MyLists;
