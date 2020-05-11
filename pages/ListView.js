import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';
import {useNavigation} from '@react-navigation/native';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const navigation = useNavigation();
  const {list} = props.route.params;
  return (
    <View>
      <View style={styles.body}>
        <SingleList list={list} />
        <CircleButton
          onPress={() => navigation.navigate('Add Item', {list: list})}
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

export default ListView;
