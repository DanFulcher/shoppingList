import React from 'react';
import {View, StyleSheet} from 'react-native';
import Lists from '../components/Lists';
import {colours} from '../styles';

const MyLists = props => {
  return (
    <View>
      <View style={styles.body}>
        <Lists />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default MyLists;
