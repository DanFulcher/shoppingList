import React from 'react';
import {View, StyleSheet} from 'react-native';
import Lists from '../components/Lists';
import Button from '../components/Button';
import {colours} from '../styles';

const MyLists = props => {
  return (
    <View>
      <View style={styles.body}>
        <Lists />
        <Button
          onPress={() => props.navigation.navigate('New List')}
          title="Create New List"
        />
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
